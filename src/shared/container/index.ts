import { container } from "tsyringe";

import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/User.repository";
import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokens.repository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/DayjsDateProvider";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "@shared/providers/MailProvider/EtherealMailProvider";
import { LocalStorageProvider } from "@shared/providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "@shared/providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "@shared/providers/StorageProvider/IStorageProvider";

container.registerSingleton<IUserRepository>("UserRepo", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepo",
  UserTokensRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK]
);
