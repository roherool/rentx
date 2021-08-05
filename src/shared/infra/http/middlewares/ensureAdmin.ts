import { Request, Response, NextFunction } from 'express'

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/User.repository'
import { AppError } from '@shared/errors/AppError'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user

  const userRepository = new UserRepository()

  const user = await userRepository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("User is not admin!")
  }

  return next()
}