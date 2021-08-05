import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber a autenticação
  const authToken = req.headers.authorization;

  // Validar se está autenticado
  if (!authToken) {
    throw new AppError("Token missing", 401);
  }

  // Verificar se o token é válido
  const [, token] = authToken.split(" ");

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;

    // Recuperar informações do usuário
    req.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
