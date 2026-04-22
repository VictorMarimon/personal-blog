import jwt from 'jsonwebtoken';

import { JWT_REFRESH_EXPIRATION, JWT_SECRET } from './constants.utils.js';

export function getTokenPayload(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        return payload;
    } catch (error) {
        return {};
    }
}

export function extractTokenValue(raw) {
    try {
        if (typeof raw !== 'string') return null;

        const firstPair = raw.split(';')[0].trim();
        // eslint-disable-next-line no-unused-vars
        const [_, value] = firstPair.split('=');

        return value ?? null;
    } catch (error) {
        return null;
    }
}

export function generateToken(data, options = {}) {
    try {
        const isRememberMe = options?.rememberMe;

        const timeExpiration = options?.expiration ?? (isRememberMe === true ? JWT_REFRESH_EXPIRATION : '1d');

        return jwt.sign(data, JWT_SECRET, { expiresIn: timeExpiration });
    } catch (error) {
        return null;
    }
}
