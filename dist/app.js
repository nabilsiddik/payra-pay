"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const passport_1 = __importDefault(require("passport"));
require("./app/config/passport");
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
exports.app.use(passport_1.default.initialize());
exports.app.use('/api/v1', routes_1.router);
exports.app.get('/', (req, res) => {
    res.send('Server is running...');
});
exports.app.use(globalErrorHandler_1.globalErrorHandler);
