const { body, param } = require('express-validator');

const idValidator = [
    param("id")
        .notEmpty()
        .withMessage('Debe especificar un usuario para la gestión.')
        .isNumeric()
        .withMessage('El usuario debe ser un id numerico.'),
];

const createValidator = [
    body("idUser")
        .notEmpty()
        .withMessage('Debe especificar un usuario para la gestión.')
        .isNumeric()
        .withMessage('El usuario debe ser un id numérico.'),
    body("description")
        .notEmpty()
        .isLength({ min: 10, max:10254 })
        .withMessage('El concepto no puede estar vacío y debe tener al menos 10 caracteres.'),
    body("amount")
        .isNumeric()
        .withMessage('Debe especificar un monto numérico')
        .notEmpty()
        .withMessage('Debe especificar un monto'),
    body("type")
        .notEmpty()
        .withMessage('Debe especificar un tipo'),
    body("date")
        .isISO8601()
        .toDate()
        .withMessage('Debe especificar una fecha en formato yyyy-mm-ddThh:mm:ss'),
];

const updateValidator = [
    body("description")
        .notEmpty()
        .isLength({ min: 10, max:10254 })
        .withMessage('El concepto no puede estar vacío y debe tener al menos 10 caracteres.'),
    body("amount")
        .isNumeric()
        .withMessage('Debe especificar un monto numérico')
        .notEmpty()
        .withMessage('Debe especificar un monto'),
    body("date")
        .isISO8601()
        .toDate()
        .withMessage('Debe especificar una fecha en formato yyyy-mm-ddThh:mm:ss'),
];

module.exports = { idValidator, createValidator, updateValidator };