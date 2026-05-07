import { Router } from 'express'

import routerArticles from './posts/articles.routes.js'
import routerAuth from './security/auth.routes.js'
import routerUsers from './users/users.routes.js'

import { ENABLE_ROUTES } from '../utils/constants.utils.js'

const router = Router()

const ROUTERS = {
  articles: routerArticles,
  auth: routerAuth,
  users: routerUsers
}

Object.entries(ROUTERS).reduce((allow, [name, subRouter]) => {
  if (ENABLE_ROUTES.includes(name)) allow.use(`/${name}`, subRouter)
  return allow
}, router)

export default router
