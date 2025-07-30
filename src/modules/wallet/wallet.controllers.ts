import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../app/errorHelpers/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import statusCodes from 'http-status-codes'
import { WalletServices } from "./wallet.services";

// Get all wallets
const getAllWallets = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await WalletServices.getAllWallets()

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Successfully retrived all wallets.',
        data: result
    })
})


export const WalletControllers = {
    getAllWallets
}