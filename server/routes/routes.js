import { Router } from 'express';

import routerUsers from './users/users.routes.js';
import { ENABLE_ROUTES } from '../utils/constants.utils.js';

const router = Router();

const ROUTERS = {
    users: routerUsers,
};

Object.entries(ROUTERS).reduce((allow, [name, subRouter]) => {
    if (ENABLE_ROUTES.includes(name)) allow.use(`/${name}`, subRouter);
    return allow;
}, router);

export default router;
