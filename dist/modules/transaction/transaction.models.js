"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transaction_interfaces_1 = require("./transaction.interfaces");
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
