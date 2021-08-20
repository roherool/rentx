import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { IUserDto } from '@modules/accounts/dtos/IUser.dto'
import { IUserRepository } from '@modules/accounts/iRepositories/IUser.repository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {

  constructor(
    @inject('UserRepo')
    private userRepo: IUserRepository) {}

  async execute({ 
    id,
    name, 
    email, 
    password,
    avatar,
    isAdmin
  }: IUserDto): Promise<void> {

    if (!email) {
      throw new AppError("Incorrect email or password")
    }

    const userAlreadyExists = await this.userRepo.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    const passwordHash = await hash(password, 8)

    await this.userRepo.create({
      id,
      name,
      email,
      password: passwordHash,
      avatar,
      isAdmin
    })
  }
}

export { CreateUserUseCase }