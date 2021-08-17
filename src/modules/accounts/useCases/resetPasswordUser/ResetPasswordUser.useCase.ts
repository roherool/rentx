import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { AppError } from "@shared/errors/AppError";

interface IResetPassword {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokensRepo")
    private userTokensRepo: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepo")
    private userRepo: IUserRepository
  ) {}

  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepo.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expiresDate,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.userRepo.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.userRepo.create(user);

    await this.userTokensRepo.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
