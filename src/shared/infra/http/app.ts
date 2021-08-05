import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'

import swaggerDocs from '@extensions/swagger.json'

import '@infra/typeorm/connect'
import '@shared/container'
import { AppError } from '@errors/AppError'
import { routes } from './routes'
import upload from "@config/upload";

class App {
  public app: express.Application

  public constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
    this.app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Controll-Allow_Origin', '*')
      res.header('Access-Controll-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      res.header('Access-Controll-Allow-Headers', 'Access, Content-type, Authorization, Acept, Origin, X-Requested-With')

      this.app.use(cors())
      next()
    })
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          error: err.message
        })
      }
    
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
      })
    })
  }

  private routes(): void {
    this.app.use(routes)
  }
}

export = new App().app
