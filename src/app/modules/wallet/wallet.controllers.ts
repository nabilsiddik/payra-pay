import { Request, Response } from "express";
import statusCodes from 'http-status-codes'
import { WalletServices } from "./wallet.services";
import { CurentUser } from "./wallet.interfaces";
import { catchAsync } from "../../errorHelpers/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

// Get all wallets
const getAllWallets = catchAsync(async(req: Request, res: Response) => {
    const result = await WalletServices.getAllWallets()

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Successfully retrived all wallets.',
        data: result
    })
})

// Get current user wallet
const getSingleWallet = catchAsync(async(req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const result = await WalletServices.getSingleWallet(decodedToken)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Single wallet retrived successfully.',
        data: result
    })
})

// Block wallet
const blockWallet = catchAsync(async(req: Request, res: Response) => {
    const result = await WalletServices.blockWallet(req)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Walled blocked.',
        data: result
    })
})


// Unblock wallet
const unblockWallet = catchAsync(async(req: Request, res: Response) => {
    const result = await WalletServices.unblockWallet(req)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Walled unblocked.',
        data: result
    })
})



// Deactivate own wallet
const deactivateOwnWallet = catchAsync(async(req: Request, res: Response) => {
    const result = await WalletServices.deactivateOwnWallet(req.user as CurentUser)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Walled deactivated.',
        data: result
    })
})


// Deactivate own wallet
const activateOwnWallet = catchAsync(async(req: Request, res: Response) => {
    const result = await WalletServices.activateOwnWallet(req.user as CurentUser)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Walled activated.',
        data: result
    })
})


export const WalletControllers = {
    getAllWallets,
    blockWallet,
    unblockWallet,
    deactivateOwnWallet,
    activateOwnWallet,
    getSingleWallet
}