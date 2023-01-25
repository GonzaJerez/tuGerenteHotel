"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
// Read environmet variables
dotenv_1.default.config();
// Create express server
const app = (0, express_1.default)();
const port = process.env.PORT;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database running");
})
    .catch((e) => {
    console.log(e);
});
// CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/reservations', require('./routes/reservations'));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map