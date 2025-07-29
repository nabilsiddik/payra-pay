import { model, Schema } from "mongoose";
import { TRANSACTION_STATUS, TRANSACTION_TYPES } from "./transaction.interfaces";

// Define transaction model
const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(TRANSACTION_TYPES)
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(TRANSACTION_STATUS),
        default: TRANSACTION_STATUS.PENDING
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
})

const Transaction = model('Transaction', transactionSchema)
export default Transaction