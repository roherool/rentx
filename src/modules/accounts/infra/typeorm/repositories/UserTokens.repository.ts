import { getRepository, Repository } from "typeorm";

import { IUserTokensDto } from "@modules/accounts/dtos/IUserTokens.dto";
import { IUserTokensRepository } from "@modules/accounts/iRepositories/IUserTokens.repository";
import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }
  
  async create({ 
    refreshToken, 
    userId, 
    expiresDate 
  }: IUserTokensDto): Promise<UserTokens> {
    const userToken = this.repository.create({
      refreshToken,
      userId,
      expiresDate
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      userId,
      refreshToken
    })

    return usersTokens
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
    
  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.repository.findOne({ refreshToken })

    return userToken
  }

}

export { UserTokensRepository }