"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservations_1 = require("../controllers/reservations");
const router = (0, express_1.Router)();
// Show all reservations
router.get('/', reservations_1.getAllReservations);
// Show reservation by id
router.get('/:id', reservations_1.getReservationById);
// Create new reservation
router.post('/', reservations_1.createReservation);
// Pay reservation
router.put('/:id', reservations_1.payReservation);
// Delete reservation
router.delete('/:id', reservations_1.deleteReservation);
module.exports = router;
//# sourceMappingURL=reservations.js.map