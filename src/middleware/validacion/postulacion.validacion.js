const { body, validationResult } = require('express-validator');

exports.validarPostulacionPas = [
  body('estudianteId')
    .notEmpty().withMessage('El ID del estudiante es requerido.')
    .isInt().withMessage('El ID del estudiante debe ser un número entero.'),
  body('pasantiaId')
    .notEmpty().withMessage('El ID de la pasantía es requerido.')
    .isInt().withMessage('El ID de la pasantía debe ser un número entero.'),
];

exports.validarPostulacionBeca = [
  body('estudianteId')
    .notEmpty().withMessage('El ID del estudiante es requerido.')
    .isInt().withMessage('El ID del estudiante debe ser un número entero.'),
  body('becaId')
    .notEmpty().withMessage('El ID de la beca es requerido.')
    .isInt().withMessage('El ID de la beca debe ser un número entero.'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};