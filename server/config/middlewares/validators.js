import { body, param, query, validationResult } from 'express-validator';

export function idValidator(fieldName = 'id') {
    return [
        param(fieldName)
            .exists()
            .withMessage(`${fieldName}Missing`)
            .notEmpty()
            .withMessage(`${fieldName}Empty`)
            .isMongoId()
            .withMessage(`${fieldName}Invalid`),
    ];
}

export function validateCreateOrUpdateUser() {
    return [
        body('admin')
            .exists()
            .withMessage('adminMissing')
            .notEmpty()
            .withMessage('adminEmpty')
            .isBoolean()
            .withMessage('adminInvalid'),
        body('email')
            .exists()
            .withMessage('emailMissing')
            .notEmpty()
            .withMessage('emailEmpty')
            .isEmail()
            .withMessage('emailInvalid'),
        body('password')
            .exists()
            .withMessage('passwordMissing')
            .notEmpty()
            .withMessage('passwordEmpty')
            .isLength({ min: 6 })
            .withMessage('passwordTooShort'),
        body('status')
            .exists()
            .withMessage('statusMissing')
            .notEmpty()
            .withMessage('statusEmpty')
            .isIn(['active', 'inactive'])
            .withMessage('statusInvalid'),
        body('username')
            .exists()
            .withMessage('usernameMissing')
            .notEmpty()
            .withMessage('usernameEmpty')
            .isLength({ min: 3 })
            .withMessage('usernameTooShort'),
    ];
}

export function validateErrors(req, res, next) {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) return next();

        const extractedErrors = [];
        errors.array().forEach((err) => extractedErrors.push(err.msg));

        return res.status(422).json({ error: extractedErrors });
    } catch (error) {
        return res.status(500).json({ error: 'internalServerError' });
    }
}