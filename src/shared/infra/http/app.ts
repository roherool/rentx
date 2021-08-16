import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import logger from "morgan";
import swaggerUI from "swagger-ui-express";

import "@shared/container";
import upload from "@config/upload";
import swaggerFile from "@extensions/swagger.json";
import { AppError } from "@errors/AppError";

import rateLimiter from "./middlewares/rateLimiter";
import createConnection from "@shared/infra/typeorm/connect";

import { router } from "./routes";

createConnection();

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(rateLimiter);
    this.app.use(express.json());
    this.app.use(logger("dev"));

    this.app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerFile));

    this.app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

    this.app.use(cors());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Controll-Allow_Origin", "*");
      res.header(
        "Access-Controll-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      res.header(
        "Access-Controll-Allow-Headers",
        "Access, Content-type, Authorization, Acept, Origin, X-Requested-With"
      );
      next();
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            error: err.message,
          });
        }

        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    );
  }

  private routes(): void {
    this.app.use(router);
  }
}

export default new App().app;
