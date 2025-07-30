import { NextFunction, Request, Response } from "express"
import statusCodes from 'http-status-codes'
import { UserServices } from "./user.services"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"
import { JwtPayload } from "jsonwebtoken"

// User registration
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

// Get all users
export const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers()

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'All user retrived successfully.',
        data: result
    })
})

// Get all agents
export const getAllAgents = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllAgents()

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'All agents retrived successfully.',
        data: result
    })
})


// Become an agent
export const becomeAnAgent = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.becomeAnAgent(req.user as JwtPayload)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'Become an agent request is pending. Once approved from Admin you will be an agent. Thank you.',
        data: result
    })
})




export const UserControllers = {
    createUser,
    getAllUsers,
    getAllAgents,
    becomeAnAgent
}