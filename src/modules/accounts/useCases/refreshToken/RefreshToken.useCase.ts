import { inject, injectable } from 'tsyringe'
import { verify, sign } from 'jsonwebtoken'

import { IUserTokensRepository } from '@modules/accounts/iRepositories/IUserTokens.repository'
import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider'

interface IPayload {
  sub: string,
  email: string
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepo')
    private userTokenRepo: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
    
    const userId = sub

    const userToken = await this.userTokenRepo.findByUserIdAndRefreshToken(
      userId, 
      token
    )

    if (!userToken) {
      throw new AppError("Refresh Token doesn't exists!")
    }

    await this.userTokenRepo.deleteById(userToken.id)

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expiresDate = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.userTokenRepo.create({
      refreshToken,
      expiresDate,
      userId
    })

    // Gerar token
    const newToken = sign({}, auth.secret_token, {
      subject: userId,
      expiresIn: auth.expires_in_token,
    });

    return {
      refreshToken,
      token: newToken
    }
  }
}

export { RefreshTokenUseCase }