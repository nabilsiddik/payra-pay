import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import { JwtPayload } from "jsonwebtoken"
import { sendResponse } from "../../app/utils/sendResponse"
import StatusCodes from 'http-status-codes'
import { TransactionServices } from "./transaction.services"

// Add money to wallet
const addMoneyToWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
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
const withdrawMoneyFromWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
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
const sendMoneyToAnotherWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user 

    const result = await TransactionServices.withdrawMoneyFromWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Successfully send money to another wallet.',
        data: result
    })
})

export const TransactionControllers = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet
}