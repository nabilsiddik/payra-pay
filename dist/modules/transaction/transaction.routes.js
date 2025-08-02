"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../app/middlewares/checkAuth");
const user_interfaces_1 = require("../user/user.interfaces");
const transaction_controllers_1 = require("./transaction.controllers");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const transaction_validations_1 = require("./transaction.validations");
exports.transactionRouter = (0, express_1.Router)();
// Add money to wallet
exports.transactionRouter.post('/add-money', (0, validateRequest_1.validateRequest)(transaction_validations_1.addMoneyZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), transaction_controllers_1.TransactionControllers.addMoneyToWallet);
// Withdraw money from wallet
exports.transactionRouter.post('/withdraw-money', (0, validateRequest_1.validateRequest)(transaction_validations_1.withDrawMoneyZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), transaction_controllers_1.TransactionControllers.withdrawMoneyFromWallet);
// Send money to another wallet
exports.transactionRouter.post('/send-money', (0, validateRequest_1.validateRequest)(transaction_validations_1.sendMoneyZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), transaction_controllers_1.TransactionControllers.sendMoneyToAnotherWallet);
// view all transaction history
exports.transactionRouter.get('/history', (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), transaction_controllers_1.TransactionControllers.getAllTransactionHistory);
// Cash in to any user wallet by agent only
exports.transactionRouter.post('/cash-in', (0, validateRequest_1.validateRequest)(transaction_validations_1.cashInZodSchema), (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.AGENT), transaction_controllers_1.TransactionControllers.cashIn);
// Cash out from any user wallet by agent only
exports.transactionRouter.post('/cash-out', (0, validateRequest_1.validateRequest)(transaction_validations_1.cashOutZodSchema), (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.USER), transaction_controllers_1.TransactionControllers.cashOut);
// Get all transactions
exports.transactionRouter.get('/', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), transaction_controllers_1.TransactionControllers.getAllTransactions);
// Set transaction parameters
exports.transactionRouter.post('/parameters/create', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), (0, validateRequest_1.validateRequest)(transaction_validations_1.transactionParameterCreationZodSchema), transaction_controllers_1.TransactionControllers.createTransactionParameters);
exports.transactionRouter.patch('/parameters/update', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), (0, validateRequest_1.validateRequest)(transaction_validations_1.transactionParameterUpdateZodSchema), transaction_controllers_1.TransactionControllers.updateTransactionParameters);
