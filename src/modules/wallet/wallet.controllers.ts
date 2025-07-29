import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../app/errorHelpers/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import statusCodes from 'http-status-codes'
import { WalletServices } from "./wallet.services";
import { JwtPayload } from "jsonwebtoken";

// Add money to wallet
const addMoneyToWallet = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const decodedToken = req.user 

    const result = await WalletServices.addMoneyToWallet(req, payload, decodedToken as JwtPayload)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Money added to wallet.',
        data: result
    })
})

export const WalletControllers = {
    addMoneyToWallet
}