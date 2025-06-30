const { body, validationResult } = require('express-validator');

exports.validacionRegistroEst = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser una cadena de texto.'),
  body('apellido')
    .notEmpty().withMessage('El apellido es requerido.')
    .isString().withMessage('El apellido debe ser una cadena de texto.'),
  body('dni')
    .notEmpty().withMessage('El DNI es requerido.')
    .isNumeric().withMessage('El DNI debe ser una cadena de texto.'),
  body('email')
    .notEmpty().withMessage('El email es requerido.')
    .isEmail().withMessage('El email debe ser una dirección de correo válida.'),
  body('contrasena')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  body('telefono')
    .notEmpty().withMessage('El teléfono es requerido.')
    .isString().withMessage('El teléfono debe ser una cadena de texto.')
    .isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 dígitos.'),
  body('carrera')
    .notEmpty().withMessage('La carrera es requerida.')
    .isString().withMessage('La carrera debe ser una cadena de texto.'),
  body('año') 
    .notEmpty().withMessage('El año que cursa es requerido.')
    .isInt({ min: 1, max: 10 }).withMessage('El año debe ser un número entre 1 y 10.'),
  body('promedio')
    .notEmpty().withMessage('El promedio es requerido.')
    .isFloat({ min: 0, max: 10 }).withMessage('El promedio debe ser un número entre 0 y 10.'), // Ajustar rango
  body('experiencia')
    .optional()
    .isString().withMessage('La experiencia debe ser una cadena de texto.'),
  body('aptitudes')
    .optional()
    .isString().withMessage('Las aptitudes deben ser una cadena de texto.'),
];

exports.validarLogin = [
  body('legajo')
    .notEmpty().withMessage('El legajo es requerido.'),
  body('contrasena')
    .notEmpty().withMessage('La contraseña es requerida.'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};