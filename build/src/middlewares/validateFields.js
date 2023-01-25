"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const { validationResult } = require('express-validator');
const validateFields = (req, res, next) => {
    // Atrapa los errores de validacion
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validateFields.js.map