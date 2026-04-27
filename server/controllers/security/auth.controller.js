import bcrypt from 'bcryptjs';

import usersModel from '../../models/users/users.model.js';
import {
    clearAuthCookiesValidator,
    deleteAuthCookies,
    setAuthCookie,
    verifyToken,
} from '../../utils/auth.utils.js';
import { generateToken } from '../../utils/jwt.utils.js';
import { handleErrorResponse } from '../../config/middlewares/errorHandler.js';

export async function logOut(req, res) {
    try {
        clearAuthCookiesValidator(res, 'eToken');
        return res.status(204).end();
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export async function signIn(req, res) {
    try {
        const { email, password, rememberMe, username } = req.body;

        // first we check if user exists with provided email or username
        const userFound = await usersModel.findOne({ $or: [{ email }, { username }] });
        if (!userFound) return res.status(404).json({ error: 'invalidCredentials' });

        // here we compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'invalidCredentials' });

        const token = generateToken(
            { id: userFound.id, admin: userFound.admin },
            { rememberMe }
        );

        // we set the token in an HTTP-only cookie
        setAuthCookie('eToken', res, token);

        return res.json({ id: userFound.id, admin: userFound.admin });
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}

export async function validateSession(req, res) {
    try {
        const { eToken } = req.cookies;
        if (!eToken) return deleteAuthCookies(res, { response: true });

        const decoded = verifyToken(eToken);
        if (!decoded) return deleteAuthCookies(res, { response: true });

        const { id } = decoded;

        const userExists = await usersModel.findOne({ _id: id });
        if (!userExists) return deleteAuthCookies(res, { response: true });

        return res.sendStatus(200);
    } catch (error) {
        return handleErrorResponse(res, error);
    }
}
