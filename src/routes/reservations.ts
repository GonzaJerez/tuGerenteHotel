import {Router} from 'express';
import {check} from 'express-validator';
import {createReservation, deleteReservation, getAllReservations, getReservationById, payReservation} from '../controllers/reservations'
import {validateFields} from '../middlewares/validateFields';
import {availableMethodPayments} from '../types/methodPayments';

const router = Router();

// Show all reservations
router.get('/',getAllReservations);

// Show reservation by id
router.get('/:id',[
  check('id', 'El UUID de la reserva es inválido').isUUID(),
  validateFields
], getReservationById);

// Create new reservation
router.post('/',[
  check('roomId', 'UUID de habitación inválido').isUUID(),
  check('checkin', 'Fecha de entrada no válida').isDate(),
  check('checkout', 'Fecha de salida no válida').isDate(),
  check('methodPayment', 'Método de pago no válido').isIn(availableMethodPayments),
  check('clientName', 'Nombre de cliente no válido').isString(),
  check('clientEmail', 'Email no válido').isEmail(),
  check('totalAmount', 'Monto total inválido').isFloat(),
  validateFields
], createReservation);

// Pay reservation
router.put('/pay/:id',[
  check('id', 'UUID de reserva inválido').isUUID(),
  check('amountPaid','El monto a pagar es inválido').isFloat({min:0}),
  validateFields
], payReservation);

// Delete reservation
router.delete('/:id',[
  check('id', 'UUID de reserva inválido').isUUID(),
  validateFields
], deleteReservation);

module.exports = router;