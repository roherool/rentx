import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { passwordRoutes } from './password.routes'
import { userRoutes } from './user.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/password', passwordRoutes)
routes.use(authRoutes)

export { routes }