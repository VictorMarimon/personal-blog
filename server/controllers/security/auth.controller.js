import { generateToken } from '../../utils/jwt.utils.js';
import { clearAuthCookiesValidator, deleteAuthCookies, setAuthCookie, verifyToken } from '../../utils/auth.utils.js';
import usersModel from '../../models/users/users.model.js';

export async function logOut(req, res) {
    try {
        clearAuthCookiesValidator(res, 'eToken');
        return res.status(204).end();
    } catch (error) {
        return sendErrorResponse(res, error);
    }
}

export async function signIn(req, res) {
    try {
        const { username, password, rememberMe } = req.body;

        const userFound = await usersModel.findOne({ username });
        if (!userFound) return res.status(404).json({ error: 'invalidCredentials' });

        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'invalidCredentials' });

        const token = generateToken(
            {
                id: userFound.id,
                admin: userFound.admin,
            },
            { rememberMe }
        );

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

        const userExists = await usersModel.findOne({ _id: id, deletedAt: null });
        if (!userExists) return deleteAuthCookies(res, { response: true });

        return res.sendStatus(200);
    } catch (error) {
        return sendErrorResponse(res, error);
    }
}