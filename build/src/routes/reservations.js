"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const reservations_1 = require("../controllers/reservations");
const validateFields_1 = require("../middlewares/validateFields");
const methodPayments_1 = require("../types/methodPayments");
const router = (0, express_1.Router)();
// Show all reservations
router.get('/', reservations_1.getAllReservations);
// Show reservation by id
router.get('/:id', [
    (0, express_validator_1.check)('id', 'UUID de reserva inválido').isUUID(),
    validateFields_1.validateFields
], reservations_1.getReservationById);
// Create new reservation
router.post('/', [
    (0, express_validator_1.check)('roomId', 'UUID de habitación inválido').isUUID(),
    (0, express_validator_1.check)('checkin', 'Fecha de entrada no válida').isDate(),
    (0, express_validator_1.check)('checkout', 'Fecha de salida no válida').isDate(),
    (0, express_validator_1.check)('methodPayment', 'Método de pago no válido').isIn(methodPayments_1.availableMethodPayments),
    (0, express_validator_1.check)('clientName', 'Nombre de cliente no válido').isString(),
    (0, express_validator_1.check)('clientEmail', 'Email no válido').isEmail(),
    (0, express_validator_1.check)('totalAmount', 'Monto total inválido').isFloat(),
    validateFields_1.validateFields
], reservations_1.createReservation);
// Pay reservation
router.put('/pay/:id', [
    (0, express_validator_1.check)('id', 'UUID de reserva inválido').isUUID(),
    (0, express_validator_1.check)('amountPaid', 'El monto a pagar es inválido').isFloat({ min: 0 }),
    validateFields_1.validateFields
], reservations_1.payReservation);
// Delete reservation
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'UUID de reserva inválido').isUUID(),
    validateFields_1.validateFields
], reservations_1.deleteReservation);
module.exports = router;
//# sourceMappingURL=reservations.js.map