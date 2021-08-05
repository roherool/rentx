import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUserUseCase } from "@modules/accounts/useCases/authUser/AuthUser.useCase";

class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);

    const token = await authUserUseCase.execute({
      email,
      password,
    });

    return res.json(token);
  }
}

export { AuthUserController };
