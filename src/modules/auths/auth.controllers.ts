import { NextFunction, Request, Response } from "express"
import { sendResponse } from "../../app/utils/sendResponse"
import statusCodes from 'http-status-codes'
import AppError from "../../app/errorHelpers/appError"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import passport from "passport"
import { createUserTokens } from "../../app/utils/userTokens"
import { setAuthCookie } from "../../app/utils/setCookie"

// Credential login
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // throw error if not provided any credential info
    if (!req.body) {
        throw new AppError(statusCodes.NOT_FOUND, 'Request body not found while credential login.')
    }

    passport.authenticate("local", async (error: any, user: any, info: any) => {

        if (error) {
            return next(new AppError(401, error))
        }

        if (!user) {
            return next(new AppError(401, info.message))
        }

        // user tokens
        const userTokens = createUserTokens(user)

        // Take the rest of the user info without password
        const {password, ...rest} = user.toObject()

        // Set access token or refresh token into cookie
        setAuthCookie(res, userTokens)

        // Send response
        sendResponse(res, {
            statusCode: statusCodes.OK,
            success: true,
            message: 'User Successfully Loged In',
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            }
        })
    })(req, res, next)
})

export const AuthControllers = {
    credentialLogin
}