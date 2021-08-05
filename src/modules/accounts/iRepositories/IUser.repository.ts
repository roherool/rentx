import { IUserDto } from "@modules/accounts/dtos/IUser.dto";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

export interface IUserRepository {
  create(data: IUserDto): Promise<void>
  findByName(name: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  list(): Promise<User[]>
}