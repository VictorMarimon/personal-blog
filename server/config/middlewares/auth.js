import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

import { clearAuthCookiesValidator, verifyToken } from '../../utils/auth.utils.js'
import { PATHS_TO_SKIP_FOR_RATE_LIMITING } from '../../utils/constants.utils.js'

export function globalLimiter (ms = 1 * 60 * 1000, maxRequests = 100) {
  return rateLimit({
    windowMs: ms,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) =>
      PATHS_TO_SKIP_FOR_RATE_LIMITING.some(
        ({ path, method }) => req.path.startsWith(path) && (!method || req.method === method)
      ),
    handler: (req, res) => {
      return res.status(429).json({ error: 'tooManyRequests' })
    }
  })
}

export function loginLimiter (ms = 15 * 60 * 1000, maxAttempts = 5) {
  return rateLimit({
    windowMs: ms,
    max: maxAttempts,
    standardHeaders: true, // this attributes return info in headers `RateLimit-*` (RFC standard)
    legacyHeaders: false, // disables deprecated `X-RateLimit-*` headers
    skipSuccessfulRequests: true, // only counts failed attempts (does not penalize successful logins)
    keyGenerator: (req) => {
      // here we assume that the login endpoint accepts either 'email' or 'username' in the body
      const identifier = req.body?.email || req.body?.username || req.ip
      return `${ipKeyGenerator(req)}-${identifier}`
    },
    handler: (req, res) => {
      return res.status(429).json({ error: 'tooManyRequests' })
    }
  })
}

export function routeValidation ({ onlyAdmin = false } = {}) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.eToken

      if (!token) {
        return res.status(401).json({ error: 'accessDenied' })
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        clearAuthCookiesValidator(res, 'eToken')
        return res.status(404).json({ error: 'jwtInvalid' })
      }

      req.user = decoded

      // if the route requires admin role and the user is not an admin, we return an error
      if (onlyAdmin && !req.user.admin) {
        return res.status(403).json({ error: 'roleAccessDenied' })
      }

      // we check if the user still exists in the database and if their account is active
      const user = await usersModel.findById(req.user.id)
      if (!user) {
        clearAuthCookiesValidator(res, 'eToken')
        return res.status(404).json({ error: 'userNotFound' })
      }

      // if the user's account is not active, we clear the auth cookies and return an error
      if (user.status !== 'active') {
        clearAuthCookiesValidator(res, 'eToken')
        return res.status(403).json({ error: 'accountInactive' })
      }

      return next()
    } catch (error) {
      return res.status(401).json({ error: 'unauthorized' })
    }
  }
}
