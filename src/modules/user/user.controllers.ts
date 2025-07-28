import { NextFunction, Request, Response } from "express"
import statusCodes from 'http-status-codes'
import { UserServices } from "./user.services"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"

export const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const newUser = await UserServices.createUser(payload)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'New user created.',
        data: newUser
    })
})


export const UserControllers = {
    createUser
}