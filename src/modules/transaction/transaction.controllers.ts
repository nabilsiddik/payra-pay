import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { sendResponse } from "../../app/utils/sendResponse"
import StatusCodes from 'http-status-codes'
import { TransactionServices } from "./transaction.services"
import AppError from "../../app/errorHelpers/appError"

// Add money to wallet
const addMoneyToWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.addMoneyToWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Money added to wallet.',
        data: result
    })
})

// Withdraw money from wallet
const withdrawMoneyFromWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.withdrawMoneyFromWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully withdraw money from wallet.',
        data: result
    })
})


// send money to another wallet
const sendMoneyToAnotherWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user

    const result = await TransactionServices.sendMoneyToAnotherWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully send money to another wallet.',
        data: result
    })
})


// Get all transaction history
const getAllTransactionHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is not available.')
    }

    const decodedToken = req.user

    const result = await TransactionServices.getAllTransactionHistory(req, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Users transaction history retrived successfully.',
        data: result
    })
})


// Cash in to any user wallet by an agent only
const cashIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    const result = await TransactionServices.cashIn(req.body, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Cash in successfull.',
        data: result
    })
})


// Cash out from any user wallet by an agent only
const cashOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    const result = await TransactionServices.cashOut(req.body, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Cash out successfull.',
        data: result
    })
})

export const TransactionControllers = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet,
    getAllTransactionHistory,
    cashIn,
    cashOut
}