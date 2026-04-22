// .env

export const APP_NAME = process.env.APP_NAME;
export const COOKIE_HTTP_ONLY = process.env?.COOKIE_HTTP_ONLY;
export const COOKIE_SAME_SITE = process.env?.NODE_ENV === 'production' ? process.env?.COOKIE_SAME_SITE : 'Lax';
export const COOKIE_SECURE = process.env?.NODE_ENV === 'production' ? process.env?.COOKIE_SECURE : false;
export const COOKIE_TIME_EXPIRATION = process.env?.COOKIE_TIME_EXPIRATION;
export const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') || [];
export const DB_NAME = process.env.DB_NAME;
export const ENABLE_ROUTES = process.env?.ENABLE_ROUTES?.split(',').filter(Boolean) || [];
export const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 3001;
