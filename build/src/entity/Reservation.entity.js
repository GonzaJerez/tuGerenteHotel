"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const StatusReservation_1 = require("../types/StatusReservation");
const Invoice_entity_1 = require("./Invoice.entity");
const Room_entity_1 = require("./Room.entity");
let Reservation = class Reservation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", Date)
], Reservation.prototype, "checkin", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", Date)
], Reservation.prototype, "checkout", void 0);
__decorate([
    (0, typeorm_1.Column)("float", {
        default: 0
    }),
    __metadata("design:type", Number)
], Reservation.prototype, "amountPaid", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Reservation.prototype, "methodPayment", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Reservation.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Reservation.prototype, "clientEmail", void 0);
__decorate([
    (0, typeorm_1.Column)("text", {
        default: StatusReservation_1.StatusReservation.PENDIENTE
    }),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Invoice_entity_1.Invoice, invoice => invoice.reservation, { cascade: true, eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Invoice_entity_1.Invoice)
], Reservation.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Room_entity_1.Room, room => room.reservation, { eager: true }),
    __metadata("design:type", Room_entity_1.Room)
], Reservation.prototype, "room", void 0);
Reservation = __decorate([
    (0, typeorm_1.Entity)()
], Reservation);
exports.Reservation = Reservation;
//# sourceMappingURL=Reservation.entity.js.map