import { NextFunction, Request, Response } from "express"
import statusCodes from 'http-status-codes'
import passport from "passport"
import { catchAsync } from "../../errorHelpers/catchAsync"
import AppError from "../../errorHelpers/appError"
import { createUserTokens } from "../../utils/userTokens"
import { setAuthCookie } from "../../utils/setCookie"
import { sendResponse } from "../../utils/sendResponse"
import { enVars } from "../../config/env"

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
        user
      }
    })
  })(req, res, next)
})

// Logout
const logOut = catchAsync(
  async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: enVars.NODE_ENV === 'production',
      sameSite: 'none',
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: enVars.NODE_ENV === 'production',
      sameSite: 'none',
    });

    sendResponse(res, {
      statusCode: statusCodes.OK,
      success: true,
      message: "User loged out successfull",
      data: null,
    });
  }
);

export const AuthControllers = {
  credentialLogin,
  logOut
}