import usersModel from '../../models/users/users.model.js';
import { handleErrorResponse } from '../../config/middlewares/errorHandler.js';

export async function createUser(req, res) {
    try {
        const { admin, email, password, status, username } = req.body;

        const userCreated = await usersModel.create({
            admin,
            email,
            password,
            status,
            username,
        });

        return res.status(201).json(userCreated);
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        // we use the technique of soft delete to avoid losing data, we just set the deletedAt field to the current date
        const userDeleted = await usersModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { returnDocument: 'after' });

        if (!userDeleted) {
            return res.status(404).json({ error: 'userNotFound' });
        }

        return res.status(200).json({ deleted: id });
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export async function getUsers(req, res) {
    try {
        const users = await usersModel.find();

        return res.status(200).json(users);
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { admin, email, password, status, username } = req.body;

        const userUpdated = await usersModel.findByIdAndUpdate(
            id,
            { admin, email, password, status, username },
            { returnDocument: 'after' }
        );

        if (!userUpdated) {
            return res.status(404).json({ error: 'userNotFound' });
        }

        // here we remove the password from the response for security reasons
        const userWithoutPassword = { ...userUpdated.toObject(), password: undefined };

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}
