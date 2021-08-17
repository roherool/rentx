import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

interface IUserRequest {
  email: string;
  password: string;
}

interface IUserResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UserRepo")
    private userRepo: IUserRepository,
    @inject("UserTokensRepo")
    private userTokensRepo: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IUserRequest): Promise<IUserResponse> {
    // Verificar se usuário existe
    const user = await this.userRepo.findByEmail(email);
    const {
      secret_token,
      secret_refresh_token,
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Incorrect email or password!", 401);
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email or password!");
    }

    // Gerar token
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    // Gerar refresh token
    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.userTokensRepo.create({
      userId: user.id,
      refreshToken,
      expiresDate: refresh_token_expires_date,
    });

    const tokenReturn: IUserResponse = {
      token,
      user: {
        username: user.name,
        email: user.email,
      },
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthUserUseCase };
