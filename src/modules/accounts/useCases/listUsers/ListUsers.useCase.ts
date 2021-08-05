import { container } from "tsyringe";
import { classToPlain } from 'class-transformer'

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/User.repository";

class ListUsersUseCase {

  async execute() {
    const userRepository = container.resolve(UserRepository)

    const users = await userRepository.list()

    return classToPlain(users)
  }
}

export { ListUsersUseCase }