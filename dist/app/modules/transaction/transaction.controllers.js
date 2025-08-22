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
exports.TransactionControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transaction_services_1 = require("./transaction.services");
const catchAsync_1 = require("../../errorHelpers/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
// Get all transactions
const getAllTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield transaction_services_1.TransactionServices.getAllTransactions(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Successfully retrived all transactions.',
        data: result.transactions,
        meta: result.meta
    });
}));
// Add money to wallet
const addMoneyToWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.addMoneyToWallet(req, payload, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Money added to wallet.',
        data: result
    });
}));
// Withdraw money from wallet
const withdrawMoneyFromWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.withdrawMoneyFromWallet(req, payload, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Successfully withdraw money from wallet.',
        data: result
    });
}));
// send money to another wallet
const sendMoneyToAnotherWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.sendMoneyToAnotherWallet(req, payload, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Successfully send money to another wallet.',
        data: result
    });
}));
// Get all transaction history
const getAllTransactionHistory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.getAllTransactionHistory(req, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Users transaction history retrived successfully.',
        data: result
    });
}));
// Cash in to any user wallet by an agent only
const cashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.cashIn(req.body, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Cash in successfull.',
        data: result
    });
}));
// Cash out from any user wallet by an agent only
const cashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield transaction_services_1.TransactionServices.cashOut(req.body, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Cash out successfull.',
        data: result
    });
}));
// Set transacton parameters
const createTransactionParameters = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_services_1.TransactionServices.createTransactionParameters(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Transaction parameter crated successfully.',
        data: result
    });
}));
// update transacton parameters
const updateTransactionParameters = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_services_1.TransactionServices.updateTransactionParameter(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Transaction parameter updated successfully.',
        data: result
    });
}));
exports.TransactionControllers = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet,
    getAllTransactionHistory,
    cashIn,
    cashOut,
    getAllTransactions,
    createTransactionParameters,
    updateTransactionParameters
};
