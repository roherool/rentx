import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUser.useCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      name,
      email,
      password,
      avatar,
      isAdmin
    } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      id,
      name,
      email,
      password,
      avatar,
      isAdmin
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
