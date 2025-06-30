const { body, validationResult } = require('express-validator');

exports.validarOfertaBeca = [
  body('requisitos')
    .notEmpty().withMessage('Los requisitos son requeridos.')
    .isString().withMessage('Los requisitos deben ser una cadena de texto.'),
  body('duracion')
    .notEmpty().withMessage('La duración es requerida.')
    .isString().withMessage('La duración debe ser una cadena de texto.'),
  body('cupos')
    .notEmpty().withMessage('Los cupos son requeridos.')
    .isInt({ min: 1 }).withMessage('Los cupos deben ser un número entero positivo.'),
  body('beneficios')
    .notEmpty().withMessage('Los beneficios son requeridos.')
    .isString().withMessage('Los beneficios deben ser una cadena de texto.'),
  body('monto')
    .notEmpty().withMessage('El monto es requerido.')
    .isFloat({ min: 0 }).withMessage('El monto debe ser un número positivo.'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};