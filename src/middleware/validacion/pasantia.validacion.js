const { body, validationResult } = require('express-validator');

exports.validarOfertaPasantia = [
  body('requisitos')
    .notEmpty().withMessage('Los requisitos son requeridos.')
    .isString().withMessage('Los requisitos deben ser una cadena de texto.'),
  body('duracion')
    .notEmpty().withMessage('La duración es requerida.')
    .isString().withMessage('La duración debe ser una cadena de texto.'),
  body('fechaInicio')
    .notEmpty().withMessage('La fecha de inicio es requerida.')
    .isISO8601().toDate().withMessage('La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).'),
  body('estado')
    .notEmpty().withMessage('El estado es requerido.')
    .isIn(['Activa', 'Cerrada', 'Pendiente']).withMessage('Estado inválido.'),
  body('empresaId')
    .notEmpty().withMessage('El ID de la empresa es requerido.')
    .isInt().withMessage('El ID de la empresa debe ser un número entero.'),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};