import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { passwordRoutes } from './password.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/password', passwordRoutes)
router.use(authRoutes)

export { router }