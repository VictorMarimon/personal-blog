export function routeNotFound(req, res, next) {
    res.status(404).json({
        message: 'Route does not exist',
        method: req.method,
        path: req.originalUrl,
        success: false,
        timestamp: new Date().toISOString(),
    });
}

export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: 'Internal server error',
        success: false,
    });
}

export function handleErrorResponse(res, error, status = 500) {
    const controllerName = res.req?.baseUrl || '/api/Unknown';
    const API_ROUTE_PREFIX_LENGTH = 13;

    console.error(`[ERR_CONTROLLER] (${controllerName.slice(API_ROUTE_PREFIX_LENGTH)}):`, error);

    return res.status(status).json({ error: 'internalServerError' });
}
