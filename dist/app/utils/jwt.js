"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate access token
const generateToken = (payload, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn
    });
    return token;
};
exports.generateToken = generateToken;
// Verify access token
const verifyToken = (accessToken, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(accessToken, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
