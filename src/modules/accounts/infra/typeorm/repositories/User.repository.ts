import { getRepository, Repository } from 'typeorm'

import { IUserDto } from '@modules/accounts/dtos/IUser.dto'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/accounts/iRepositories/IUser.repository'


class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ 
    id,
    name, 
    email, 
    password,
    avatar,
    isAdmin,
  }: IUserDto): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email, 
      password,
      avatar,
      isAdmin,
    })

    await this.repository.save(user)
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find()
    return users
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name })
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }
}

export { UserRepository }