import { Router } from 'express';

import { createUser, deleteUser, getUsers, updateUser } from '../../controllers/users/users.controller.js';
import { idValidator, validateCreateOrUpdateUser, validateErrors } from '../../config/middlewares/validators.js';

const routerUsers = Router();

routerUsers.delete('/:id', idValidator(), validateErrors, deleteUser);
routerUsers.get('/', getUsers);
routerUsers.post('/', validateCreateOrUpdateUser(), validateErrors, createUser);
routerUsers.put('/:id', idValidator(), validateCreateOrUpdateUser(), validateErrors, updateUser);

export default routerUsers;
