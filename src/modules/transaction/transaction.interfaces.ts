import { Types } from "mongoose";

export enum TRANSACTION_TYPES{
    ADD_MONEY = 'ADD_MONEY',
    WITHDRAW_MONEY = 'WITHDRAW_MONEY',
    SEND_MONEY = 'SEND_MONEY'
}

export enum TRANSACTION_STATUS{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCLED = 'CANCLED'
}

export interface ITransaction{
    user: Types.ObjectId,
    type: TRANSACTION_TYPES,
    status: TRANSACTION_STATUS,
    amount: number,
    fee?: number,
    commision?: number
}