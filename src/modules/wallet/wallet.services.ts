import { Request } from "express";
import { IWallet } from "./wallet.interfaces";
import AppError from "../../app/errorHelpers/appError";
import StatusCodes from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import Wallet from "./wallet.models";
import mongoose from "mongoose";

// Business logics of add money to wallet
const addMoneyToWallet = async (req: Request, payload: Partial<IWallet>, decodedToken: JwtPayload) => {
    // amount to be added
    const { balance } = payload
    const userId = decodedToken.userId

    if (!req.user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    // make user id to a mongoose object id
    const objectUserId = new mongoose.Types.ObjectId(userId)

    // find the current user wallet
    const currentUserWallet = await Wallet.findOne({ user: objectUserId })

    if (!currentUserWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // Updated the wallet balance
    currentUserWallet.balance += Number(balance)
    await currentUserWallet?.save()

    return currentUserWallet

}


// Business logics of withdraw money from wallet
const withdrawMoneyFromWallet = async (req: Request, payload: Partial<IWallet>, decodedToken: JwtPayload) => {
    // amount to withdraw
    const { balance } = payload
    const userId = decodedToken.userId

    if (balance === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Balance not available.')
    }

    if (!balance) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Withdrawl amount not found.')
    }

    if (!req.user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    // make user id to a mongoose object id
    const objectUserId = new mongoose.Types.ObjectId(userId)

    // find the current user wallet
    const currentUserWallet = await Wallet.findOne({ user: objectUserId })

    if (!currentUserWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    if (currentUserWallet.balance < balance) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficient balance to withdraw.')
    }

    // Updated the wallet balance
    currentUserWallet.balance -= Number(balance)
    await currentUserWallet?.save()

    return currentUserWallet

}


export const WalletServices = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
}