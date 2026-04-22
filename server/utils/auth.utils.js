import jwt from 'jsonwebtoken';

import {
    COOKIE_HTTP_ONLY,
    COOKIE_SAME_SITE,
    COOKIE_SECURE,
    COOKIE_TIME_EXPIRATION,
    JWT_SECRET,
} from './constants.utils.js';

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export function clearAuthCookiesValidator(res, cookieName) {
    res.clearCookie(cookieName, {
        httpOnly: COOKIE_HTTP_ONLY,
        sameSite: COOKIE_SAME_SITE,
        secure: COOKIE_SECURE,
    });
}

export function deleteAuthCookies(res, options = {}) {
    const cookies = ['eToken'];

    cookies.forEach((cookie) => {
        clearAuthCookiesValidator(res, cookie);
    });

    if (options.response) {
        return res.status(401).json({ error: 'invalidToken' });
    }
}

export async function authTokenValidator(req, res, options = {}) {
    try {
        const { eToken } = req.cookies;
        if (!eToken) {
            return deleteAuthCookies(res, { response: true });
        }

        const decoded = verifyToken(eToken);
        if (!decoded) {
            return deleteAuthCookies(res, { response: true });
        }

        const { usersModel, profilesModel } = options;
        const { id, role, profileId } = decoded;

        const userExists = await usersModel?.findOne({
            where: { id, deletedAt: null },
            attributes: ['id'],
        });

        if (!userExists) {
            return deleteAuthCookies(res, { response: true });
        }

        let permissions;

        if (role !== 'admin' && profilesModel && profileId) {
            const profile = await profilesModel.findOne({
                attributes: ['permissions'],
                where: { id: profileId },
            });

            permissions = profile?.permissions;
        }

        const extraPermissions = {};

        req.user = decoded;

        return res.json({
            permissions,
            extraPermissions,
        });
    } catch (error) {
        return res.status(500).json({ error: 'internalServerError' });
    }
}

export function getAuthenticatedUser(req) {
    return req.user ?? null;
}

export function setAuthCookie(key, res, token) {
    return res.cookie(key, token, {
        httpOnly: COOKIE_HTTP_ONLY,
        maxAge: COOKIE_TIME_EXPIRATION,
        sameSite: COOKIE_SAME_SITE,
        secure: COOKIE_SECURE,
    });
}
