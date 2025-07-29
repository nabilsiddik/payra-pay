import { Request, Response } from "express"
import { sendResponse } from "../../app/utils/sendResponse"
import statusCodes from 'http-status-codes'
import { AuthServices } from "./auth.services"
import AppError from "../../app/errorHelpers/appError"
import { catchAsync } from "../../app/errorHelpers/catchAsync"

// Credential login
const credentialLogin = catchAsync(async (req: Request, res: Response) => {

    // Throw error if no data provided while login
    if (!req.body) {
        throw new AppError(statusCodes.NOT_FOUND, 'Request body not found while credential login.')
    }

    const { email, password } = req.body

    // credential login business logics
    const result = await AuthServices.credentialLogin(email, password)

    // Send response
    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'User Successfully Loged In',
        data: result
    })
})

export const AuthControllers = {
    credentialLogin
}