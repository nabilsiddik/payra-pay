"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wallet_interfaces_1 = require("./wallet.interfaces");
// Define wallet model
const walletSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 50
    },
    totalCommision: {
        type: Number,
    },
    status: {
        type: String,
        enum: Object.values(wallet_interfaces_1.WALLET_STATUS),
        default: wallet_interfaces_1.WALLET_STATUS.ACTIVE
    }
}, {
    timestamps: true,
    versionKey: false
});
const Wallet = (0, mongoose_1.model)('Wallet', walletSchema);
exports.default = Wallet;
