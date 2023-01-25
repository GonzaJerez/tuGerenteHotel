"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_1 = require("../controllers/rooms");
const router = (0, express_1.Router)();
router.get('/load', rooms_1.loadDefaultRooms);
router.get('/', rooms_1.getRooms);
module.exports = router;
//# sourceMappingURL=rooms.js.map