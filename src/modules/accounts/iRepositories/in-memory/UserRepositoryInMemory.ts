import { IUserDto } from "@modules/accounts/dtos/IUser.dto";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "../IUser.repository";

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = []

  async create({ 
    name, 
    email, 
    password,
    isAdmin
  }: IUserDto): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name, 
      email, 
      password,
      isAdmin
    })

    this.users.push(user)
  }

  async findByName(name: string): Promise<User> {
    return this.users.find((user) => user.name === name)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }

  async list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  
}

export { UserRepositoryInMemory }