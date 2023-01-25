"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
// Read environmet variables
dotenv_1.default.config();
// Create express server
exports.app = (0, express_1.default)();
const port = process.env.PORT;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database running");
})
    .catch((e) => {
    console.log(e);
    throw new Error('No se pudo conectar con la base de datos');
});
// CORS
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Routes
exports.app.use('/api/reservations', require('./routes/reservations'));
exports.app.use('/api/rooms', require('./routes/rooms'));
exports.app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map