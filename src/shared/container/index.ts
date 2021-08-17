import { container } from "tsyringe";

import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/User.repository";
import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokens.repository";

container.registerSingleton<IUserRepository>("UserRepo", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepo",
  UserTokensRepository
);
