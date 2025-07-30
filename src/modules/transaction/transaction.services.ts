import { Request } from "express";
import AppError from "../../app/errorHelpers/appError";
import StatusCodes from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { IWallet } from "../wallet/wallet.interfaces";
import Wallet from "../wallet/wallet.models";
import { ICashIn, ITransaction, TRANSACTION_STATUS, TRANSACTION_TYPES } from "./transaction.interfaces";
import Transaction from "./transaction.models";
import User from "../user/user.models";

// Business logics of add money to wallet
const addMoneyToWallet = async (req: Request, payload: Partial<IWallet>, decodedToken: JwtPayload) => {
    // amount to be added
    const { balance } = payload
    const userId = decodedToken.userId

    if (balance === 0) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Balance must be greater than 0.')
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

    // Updated the wallet balance
    currentUserWallet.balance += Number(balance)
    await currentUserWallet?.save()


    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: TRANSACTION_TYPES.ADD_MONEY,
        amount: balance,
        status: TRANSACTION_STATUS.COMPLETED,
    }

    const transaction = await Transaction.create(transactionPayload)


    return {
        wallet: currentUserWallet,
        transaction
    }

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

    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: TRANSACTION_TYPES.WITHDRAW_MONEY,
        amount: balance,
        status: TRANSACTION_STATUS.COMPLETED,
    }

    const transaction = await Transaction.create(transactionPayload)

    return {
        wallet: currentUserWallet,
        transaction
    }

}



// Send money to another wallet
const sendMoneyToAnotherWallet = async (req: Request, payload: Partial<ITransaction>, decodedToken: JwtPayload) => {
    const { amount, numberTo } = payload
    const userId = decodedToken.userId


    if (!req.user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    // User from send money
    const userFromSendMoney = await User.findById(userId)

    if (!userFromSendMoney) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not available.')
    }

    // find current user wallet
    const objectUserId = new mongoose.Types.ObjectId(userId)
    const currentUserWallet = await Wallet.findOne({ user: userId })

    if (!currentUserWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Current user wallet not available.')
    }



    // find the user to send money
    const userToSendMOney = await User.findOne({ phone: numberTo })

    if (!userToSendMOney) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'The user you are trying to send money is not available.')
    }

    // find user wallet to send money
    const toUserWallet = await Wallet.findOne({ user: userToSendMOney })

    if (!toUserWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'To user wallet not available.')
    }


    // Minus balance from current user wallet
    currentUserWallet.balance -= Number(amount)
    await currentUserWallet.save()
    // Add balance to user wallet
    toUserWallet.balance += Number(amount)
    await toUserWallet.save()


    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: TRANSACTION_TYPES.SEND_MONEY,
        amount: amount,
        numberFrom: userFromSendMoney.phone,
        numberTo: userToSendMOney.phone,
        status: TRANSACTION_STATUS.COMPLETED,
    }

    const transaction = await Transaction.create(transactionPayload)

    return {
        currentUserWallet,
        toUserWallet,
        transaction
    }


}


// Get all transaction history
const getAllTransactionHistory = async (req: Request, decodedToken: JwtPayload) => {
    
    const userId = decodedToken.userId

    const user = await User.findById(userId)

    if(!user){
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    // convert userId to an object id
    const objectUserId = new Types.ObjectId(userId)
    // gett logged in users transactions
    const transactions = await Transaction.find({user: objectUserId})

    if(!transactions){
        throw new AppError(StatusCodes.BAD_REQUEST, 'No transaction available.')
    }

    return transactions

}



// Cash in to any user wallet by an agent only
const cashIn = async (payload: ICashIn, decodedToken: JwtPayload) => {
    const { phone, amount } = payload
    const userId = decodedToken.userId

    if (!userId) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    // User from send money
    const userAgent = await User.findById(userId)

    if (!userAgent) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not user agent.')
    }

    // find user agent wallet
    const objectAgentId = new mongoose.Types.ObjectId(userId)
    const userAgentWallet = await Wallet.findOne({ user: objectAgentId })

    if (!userAgentWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Agent wallet not found.')
    }

    // check if the cash in amount available to agent wallet or not
    if(userAgentWallet.balance < amount){
        throw new AppError(StatusCodes.NOT_FOUND, 'Insuficient balance in agent wallet.')
    }



    // find the user to cash in
    const userToCashIn = await User.findOne({ phone })

    if (!userToCashIn) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User not found while cash in.')
    }

    // find user wallet to cash in
    const toUserWallet = await Wallet.findOne({ user: userToCashIn._id })

    if (!toUserWallet) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User wallet not found while cash in.')
    }


    // Minus balance from current user wallet
    userAgentWallet.balance -= Number(amount)
    await userAgentWallet.save()

    // Add balance to user wallet
    toUserWallet.balance += Number(amount)
    await toUserWallet.save()


    // Create transaction
    const transactionPayload = {
        user: objectAgentId,
        type: TRANSACTION_TYPES.CASH_IN,
        amount: amount,
        numberFrom: userAgent.phone,
        numberTo: userToCashIn.phone,
        status: TRANSACTION_STATUS.COMPLETED,
    }

    const transaction = await Transaction.create(transactionPayload)

    return {
        userAgentWallet,
        toUserWallet,
        transaction
    }


}



export const TransactionServices = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet,
    getAllTransactionHistory,
    cashIn
}