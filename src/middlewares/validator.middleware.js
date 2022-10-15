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

const userCreateValidator = [
    body("firstName").notEmpty().isLength({ min: 2, max:65 }).withMessage('El nombre no puede estar vacío y debe tener al menos 2 caracteres.'),
    body("lastName").notEmpty().withMessage('El apellido no puede estar vacío.'),
    body("email").isEmail().withMessage('Debes ingresar un email válido.'),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }).withMessage('La contraseña deberá contener al menos 1 letra mayúscula, 1 minúscula, un número, un carácter especial y 8 caracteres de longitud mínima.'),
]

const userLoginValidator = [
    body("email").isEmail().withMessage('Debes ingresar un email válido.'),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }).withMessage('La contraseña deberá contener al menos 1 letra mayúscula, 1 minúscula, un número, un carácter especial y 8 caracteres de longitud mínima.'),
]

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

module.exports = { idValidator, createValidator, updateValidator, userCreateValidator, userLoginValidator };