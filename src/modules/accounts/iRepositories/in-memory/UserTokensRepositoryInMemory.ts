import { IUserTokensDto } from "@modules/accounts/dtos/IUserTokens.dto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokens.repository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    refreshToken,
    userId,
    expiresDate,
  }: IUserTokensDto): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.userId === userId && ut.refreshToken && refreshToken
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refreshToken === refreshToken
    );

    return userToken;
  }
}

export { UserTokensRepositoryInMemory };
