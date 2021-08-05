import { IUserTokensDto } from "@modules/accounts/dtos/IUserTokens.dto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create({ 
    refreshToken, 
    userId, 
    expiresDate 
  }: IUserTokensDto): Promise<UserTokens>

  findByUserIdAndRefreshToken(
    userId: string, 
    refreshToken: string
  ): Promise<UserTokens>

  deleteById(id: string): Promise<void>

  findByRefreshToken(refreshToken: string): Promise<UserTokens>
}