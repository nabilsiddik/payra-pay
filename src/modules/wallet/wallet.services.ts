import { Request } from "express";
import Wallet from "./wallet.models";
import AppError from "../../app/errorHelpers/appError";
import StatusCodes from "http-status-codes";
import { WALLET_STATUS } from "./wallet.interfaces";

// get all wallets
const getAllWallets = async () => {
    const wallets = await Wallet.find()
    return wallets
}

// block a wallet
const blockWallet = async(req: Request) => {
    const walletId = req.params.id

    // If wallet id not available
    if(!walletId){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet id not found.')
    }

    const wallet = await Wallet.findById(walletId)

    // If wallet not available
    if(!wallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet status is already blocked or deactivated
    if(wallet.status === WALLET_STATUS.BLOCKED || wallet.status === WALLET_STATUS.DEACTIVATED){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already ${wallet.status}`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {status: WALLET_STATUS.BLOCKED}, {new: true})

    return updatedWallet
}


// Unblock a wallet
const unblockWallet = async(req: Request) => {
    const walletId = req.params.id

    // If wallet id not available
    if(!walletId){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet id not found.')
    }

    const wallet = await Wallet.findById(walletId)

    // If wallet not available
    if(!wallet){
        throw new AppError(StatusCodes.NOT_FOUND, 'Wallet not found.')
    }

    // If wallet status is already blocked or deactivated
    if(wallet.status === WALLET_STATUS.ACTIVE){
        throw new AppError(StatusCodes.BAD_REQUEST, `Wallet is already ${wallet.status}`)
    }

    // Update wallet status
    const updatedWallet = await Wallet.findByIdAndUpdate(walletId, {status: WALLET_STATUS.ACTIVE}, {new: true})

    return updatedWallet
}



export const WalletServices = {
    getAllWallets,
    blockWallet,
    unblockWallet
}