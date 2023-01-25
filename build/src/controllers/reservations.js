"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.deleteReservation = exports.payReservation = exports.getReservationById = exports.getAllReservations = exports.createReservation = void 0;
const data_source_1 = require("../data-source");
const Invoice_entity_1 = require("../entity/Invoice.entity");
const Reservation_entity_1 = require("../entity/Reservation.entity");
const Room_entity_1 = require("../entity/Room.entity");
const StatusReservation_1 = require("../types/StatusReservation");
const roomRepository = data_source_1.AppDataSource.getRepository(Room_entity_1.Room);
const reservationRepository = data_source_1.AppDataSource.getRepository(Reservation_entity_1.Reservation);
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { checkin, checkout, clientEmail, clientName, methodPayment, roomId, amountPaid, invoiceDescription, totalAmount } = req.body;
    try {
        const currentRoom = yield roomRepository.findOneBy({ id: roomId });
        if (!currentRoom) {
            return res.status(400).json({
                error: `No existe habitacion con el id: ${roomId}`
            });
        }
        if (amountPaid && amountPaid > totalAmount) {
            return res.status(400).json({
                error: 'El monto pagado no puede ser mayor al monto total de la reserva.'
            });
        }
        const invoice = new Invoice_entity_1.Invoice();
        invoice.date = new Date();
        invoice.description = invoiceDescription;
        invoice.totalAmount = totalAmount;
        const reservation = new Reservation_entity_1.Reservation();
        reservation.checkin = new Date(checkin);
        reservation.checkout = new Date(checkout);
        reservation.clientEmail = clientEmail;
        reservation.clientName = clientName;
        reservation.methodPayment = methodPayment;
        reservation.amountPaid = amountPaid || 0;
        reservation.status = (!amountPaid || amountPaid < totalAmount) ? StatusReservation_1.StatusReservation.PENDIENTE : StatusReservation_1.StatusReservation.PAGADO;
        reservation.room = currentRoom;
        reservation.invoice = invoice;
        yield reservationRepository.save(reservation);
        return res.status(201).json({
            reservation
        });
    }
    catch (error) {
        (0, exports.handleErrors)(error, res);
    }
});
exports.createReservation = createReservation;
const getAllReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    try {
        const [reservations, totalReservations] = yield reservationRepository.findAndCount({
            take: +limit,
            skip: (+page * +limit) - (+limit)
        });
        return res.status(200).json({
            totalReservations,
            page,
            limit,
            reservations,
        });
    }
    catch (error) {
        (0, exports.handleErrors)(error, res);
    }
});
exports.getAllReservations = getAllReservations;
const getReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reservation = yield reservationRepository.findOneBy({ id });
        if (!reservation) {
            return res.status(404).json({
                error: `No existe reserva con el id: ${id}`
            });
        }
        return res.status(200).json({
            reservation
        });
    }
    catch (error) {
        (0, exports.handleErrors)(error, res);
    }
});
exports.getReservationById = getReservationById;
const payReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { amountPaid } = req.body;
    try {
        const reservation = yield reservationRepository.findOneBy({ id });
        if (!reservation) {
            return res.status(404).json({
                error: `No existe reserva con el id: ${id}`
            });
        }
        if (amountPaid > reservation.invoice.totalAmount - reservation.amountPaid) {
            return res.status(400).json({
                error: 'El monto pagado no puede ser mayor al monto restante a pagar.'
            });
        }
        reservation.amountPaid += amountPaid;
        if (reservation.amountPaid === reservation.invoice.totalAmount) {
            reservation.status = StatusReservation_1.StatusReservation.PAGADO;
        }
        yield reservationRepository.save(reservation);
        return res.status(200).json({
            reservation
        });
    }
    catch (error) {
        (0, exports.handleErrors)(error, res);
    }
});
exports.payReservation = payReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reservation = yield reservationRepository.findOneBy({ id });
        if (!reservation) {
            return res.status(404).json({
                error: `No existe reserva con el id: ${id}`
            });
        }
        reservation.status = StatusReservation_1.StatusReservation.ELIMINADO;
        yield reservationRepository.save(reservation);
        return res.status(200).json({
            msg: 'Reserva eliminada exitosamente',
            reservation,
        });
    }
    catch (error) {
        (0, exports.handleErrors)(error, res);
    }
});
exports.deleteReservation = deleteReservation;
const handleErrors = (error, res) => {
    console.log(error);
    return res.status(500).json({
        msg: 'Ha ocurrido un error, comuniquese con el administrador.'
    });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=reservations.js.map