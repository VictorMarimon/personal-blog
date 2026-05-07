import { Router } from 'express'

import { createUser, deleteUser, getUsers, updateUser } from '../../controllers/users/users.controller.js'
import { idValidator, validateCreateOrUpdateUser, validateErrors } from '../../config/middlewares/validators.js'
import { routeValidation } from '../../config/middlewares/auth.js'

const routerUsers = Router()

routerUsers.delete('/:id', idValidator(), validateErrors, routeValidation({ onlyAdmin: true }), deleteUser)
routerUsers.get('/', routeValidation({ onlyAdmin: true }), getUsers)
routerUsers.post('/', validateCreateOrUpdateUser(), validateErrors, routeValidation({ onlyAdmin: true }), createUser)
routerUsers.put('/:id', idValidator(), validateCreateOrUpdateUser(), validateErrors, routeValidation({ onlyAdmin: true }), updateUser)

export default routerUsers
