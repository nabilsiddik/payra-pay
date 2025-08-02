"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionParameterUpdateZodSchema = exports.transactionParameterCreationZodSchema = exports.cashOutZodSchema = exports.cashInZodSchema = exports.sendMoneyZodSchema = exports.withDrawMoneyZodSchema = exports.addMoneyZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Add Money payload zod schema
exports.addMoneyZodSchema = zod_1.default.object({
    balance: zod_1.default.number('Balance must be a positive number')
        .int('Amount should be integer number')
        .positive('Amount should be positive Number')
        .min(10, 'Minimum add balance amount is 10')
        .max(50000, 'Maximum add balance amount is 50,000 at a time')
});
// Withdraw Money payload zod schema
exports.withDrawMoneyZodSchema = zod_1.default.object({
    balance: zod_1.default.number('Balance must be a positive number')
        .int('Amount should be integer number')
        .positive('Amount should be positive Number')
        .min(10, 'Minimum add balance amount is 10')
        .max(50000, 'Maximum add balance amount is 50,000 at a time')
});
// Send Money payload zod schema
exports.sendMoneyZodSchema = zod_1.default.object({
    numberTo: zod_1.default.string('Number must be a string')
        .length(11)
        .regex(/^01[3-9]\d{8}$/),
    amount: zod_1.default.number('Balance must be a positive number')
        .int('Amount should be integer number')
        .positive('Amount should be positive Number')
        .min(10, 'Minimum add balance amount is 10')
        .max(50000, 'Maximum add balance amount is 50,000 at a time')
});
// Cash in payload zod schema
exports.cashInZodSchema = zod_1.default.object({
    phone: zod_1.default.string('Number must be a string')
        .length(11)
        .regex(/^01[3-9]\d{8}$/),
    amount: zod_1.default.number('Balance must be a positive number')
        .int('Amount should be integer number')
        .positive('Amount should be positive Number')
        .min(10, 'Minimum add balance amount is 10')
        .max(50000, 'Maximum add balance amount is 50,000 at a time')
});
// Cash out payload zod schema
exports.cashOutZodSchema = zod_1.default.object({
    agentPhoneNumber: zod_1.default.string('Number must be a string')
        .length(11)
        .regex(/^01[3-9]\d{8}$/),
    cashOutAmount: zod_1.default.number('Balance must be a positive number')
        .int('Amount should be integer number')
        .positive('Amount should be positive Number')
        .min(10, 'Minimum add balance amount is 10')
        .max(50000, 'Maximum add balance amount is 50,000 at a time')
});
// Transaction parameter payload cration zod schema
exports.transactionParameterCreationZodSchema = zod_1.default.object({
    sendMoneyCharge: zod_1.default.number('Value must be a positive number.').positive(),
    agentCommision: zod_1.default.number('Value must be a positive number.').positive(),
    cashOutCharge: zod_1.default.number('Value must be a positive number.').positive(),
});
// Transaction parameter payload update zod schema
exports.transactionParameterUpdateZodSchema = zod_1.default.object({
    sendMoneyCharge: zod_1.default.number('Value must be a positive number.').positive().optional(),
    agentCommision: zod_1.default.number('Value must be a positive number.').positive().optional(),
    cashOutCharge: zod_1.default.number('Value must be a positive number.').positive().optional(),
});
