import { Router } from 'express'

import { AuthUserController } from '@modules/accounts/controllers/AuthUser.controller'
import { RefreshTokenController } from '@modules/accounts/controllers/RefreshToken.controller'

const authRoutes = Router()

const authUserController = new AuthUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/login', authUserController.handle)
authRoutes.post('/refresh-token', refreshTokenController.handle)

export { authRoutes }