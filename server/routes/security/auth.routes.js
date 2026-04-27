import { Router } from 'express';

import { loginLimiter } from '../../config/middlewares/auth.js';
import {
    logOut,
    signIn,
    validateSession,
} from '../../controllers/security/auth.controller.js';
import { signInValidator, validateErrors } from '../../config/middlewares/validators.js';

const routerAuth = Router();

routerAuth.get('/', validateSession);
routerAuth.post('/', signInValidator(), validateErrors, loginLimiter(), signIn);
routerAuth.delete('/', logOut);

export default routerAuth;
