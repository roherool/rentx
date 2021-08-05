import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepo")
    private userRepo: IUserRepository,
    @inject("UserTokensRepo")
    private userTokensRepo: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepo.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "email",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidv4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.userTokensRepo.create({
      refreshToken: token,
      userId: user.id,
      expiresDate,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
