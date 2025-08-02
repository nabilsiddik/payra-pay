"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionParameter = void 0;
const mongoose_1 = require("mongoose");
const transaction_interfaces_1 = require("./transaction.interfaces");
const transactionParameterSchema = new mongoose_1.Schema({
    sendMoneyCharge: {
        type: Number,
        requird: true,
    },
    agentCommision: {
        type: Number,
        required: true,
    },
    cashOutCharge: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.TransactionParameter = (0, mongoose_1.model)('TransactionParameter', transactionParameterSchema);
// Define transaction model
const transactionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(transaction_interfaces_1.TRANSACTION_TYPES)
    },
    amount: {
        type: Number,
        required: true,
    },
    totalAmountWithCharge: {
        type: Number,
    },
    charge: {
        type: Number,
    },
    agentCommision: {
        type: Number,
    },
    payraPayGot: {
        type: Number,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(transaction_interfaces_1.TRANSACTION_STATUS),
        default: transaction_interfaces_1.TRANSACTION_STATUS.PENDING
    },
    numberFrom: {
        type: String,
    },
    numberTo: {
        type: String,
    },
    fee: {
        type: Number,
    },
    commision: {
        type: Number,
    },
}, {
    timestamps: true,
    versionKey: false
});
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
