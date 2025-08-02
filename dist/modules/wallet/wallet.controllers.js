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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletControllers = void 0;
const catchAsync_1 = require("../../app/errorHelpers/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const wallet_services_1 = require("./wallet.services");
const sendResponse_1 = require("../../app/utils/sendResponse");
// Get all wallets
const getAllWallets = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_services_1.WalletServices.getAllWallets();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Successfully retrived all wallets.',
        data: result
    });
}));
// Block wallet
const blockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_services_1.WalletServices.blockWallet(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Walled blocked.',
        data: result
    });
}));
// Unblock wallet
const unblockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_services_1.WalletServices.unblockWallet(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Walled unblocked.',
        data: result
    });
}));
// Deactivate own wallet
const deactivateOwnWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_services_1.WalletServices.deactivateOwnWallet(req.user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Walled deactivated.',
        data: result
    });
}));
// Deactivate own wallet
const activateOwnWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_services_1.WalletServices.activateOwnWallet(req.user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Walled activated.',
        data: result
    });
}));
exports.WalletControllers = {
    getAllWallets,
    blockWallet,
    unblockWallet,
    deactivateOwnWallet,
    activateOwnWallet
};
