import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatar.useCase'

class UpdateUserAvatarController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    // Receber arquivo avatar
    const avatarFile = req.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile})

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }