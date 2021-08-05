import { Router } from 'express'

import { SendForgotPasswordMailController } from '@modules/accounts/controllers/SendForgotPasswordEmail.controller'
import { ResetPasswordUserController } from '@modules/accounts/controllers/ResetPasswordUser.controller'

const sendForgotPasswordMailController = new SendForgotPasswordMailController
const resetPasswordUserController = new ResetPasswordUserController

const passwordRoutes = Router()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

export { passwordRoutes }