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
exports.getRooms = exports.loadDefaultRooms = void 0;
const data_source_1 = require("../data-source");
const Room_entity_1 = require("../entity/Room.entity");
const reservations_1 = require("./reservations");
const defaultRooms = [
    {
        floor: 1,
        number: 1,
        beds: 1,
        description: 'Habitación simple',
    },
    {
        floor: 1,
        number: 2,
        beds: 1,
        description: 'Habitación simple',
    },
    {
        floor: 1,
        number: 3,
        beds: 2,
        description: 'Habitación doble',
    },
    {
        floor: 2,
        number: 1,
        beds: 2,
        description: 'Habitación doble',
    },
    {
        floor: 2,
        number: 2,
        beds: 3,
        description: 'Habitación grande',
    },
    {
        floor: 3,
        number: 1,
        beds: 4,
        description: 'Suite',
    },
];
const roomRepository = data_source_1.AppDataSource.getRepository(Room_entity_1.Room);
const loadDefaultRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existRooms = yield roomRepository.find({});
    if (existRooms.length > 0) {
        return res.status(403).json({
            error: 'Las habitaciones ya fueron cargadas.'
        });
    }
    const roomsCreated = [];
    for (let i = 0; i < defaultRooms.length; i++) {
        const room = new Room_entity_1.Room();
        room.floor = defaultRooms[i].floor;
        room.number = defaultRooms[i].number;
        room.beds = defaultRooms[i].beds;
        room.description = defaultRooms[i].description;
        roomsCreated.push(room);
    }
    try {
        yield roomRepository.save(roomsCreated);
        return res.status(201).json({
            ok: true,
            msg: 'Habitaciones cargadas exitosamente.'
        });
    }
    catch (error) {
        (0, reservations_1.handleErrors)(error, res);
    }
});
exports.loadDefaultRooms = loadDefaultRooms;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomRepository.find({});
        return res.status(200).json({
            rooms
        });
    }
    catch (error) {
        (0, reservations_1.handleErrors)(error, res);
    }
});
exports.getRooms = getRooms;
//# sourceMappingURL=rooms.js.map