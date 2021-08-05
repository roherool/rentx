import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository";
import { IUserResponseDto } from "@modules/accounts/dtos/IUserResponse.dto";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UserRepo")
    private userRepo: IUserRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDto> {
    const user = await this.userRepo.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
