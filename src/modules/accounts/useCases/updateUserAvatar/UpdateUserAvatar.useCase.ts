import { inject, injectable } from "tsyringe"

import { IUserRepository } from "@modules/accounts/iRepositories/IUser.repository"
import { IStorageProvider } from "@shared/providers/StorageProvider/IStorageProvider"

interface IAvatarRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepo')
    private userRepo: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  
  async execute({ userId, avatarFile }: IAvatarRequest): Promise<void> {
    const user = await this.userRepo.findById(userId)

    
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    await this.storageProvider.save(avatarFile, 'avatar')
    
    user.avatar = avatarFile

    await this.userRepo.create(user)
  }
}

export { UpdateUserAvatarUseCase }