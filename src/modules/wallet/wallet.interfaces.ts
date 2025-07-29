import { Types } from "mongoose";

export enum WALLET_STATUS{
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    BLOCKED = 'BLOCKED'
}

export interface IWallet{
    user: Types.ObjectId,
    balance: number,
    status: WALLET_STATUS
}