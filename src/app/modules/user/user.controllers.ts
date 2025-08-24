import { Request, Response } from "express"
import statusCodes from 'http-status-codes'
import { UserServices } from "./user.services"
import { JwtPayload } from "jsonwebtoken"
import { CurentUser } from "../wallet/wallet.interfaces"
import { catchAsync } from "../../errorHelpers/catchAsync"
import { sendResponse } from "../../utils/sendResponse"

// User registration
export const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const newUser = await UserServices.createUser(payload)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'New user created.',
        data: newUser
    })
})

// Update user
export const updateUser = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body
    const result = await UserServices.updateUser(req.user as CurentUser, payload)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'User updated.',
        data: result
    })
})


// delete user
export const deleteUser = catchAsync(async (req: Request, res: Response) => {

    const userId = req.params.id
    const result = await UserServices.deleteUser(userId)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'User Deleted.',
        data: result
    })
})


// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const query = req.query as Record<string, string>
    const result = await UserServices.getAllUsers(query)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'All user retrived successfully.',
        data: result.users,
        meta: result.meta
    })
})

// Get me
export const getMe = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'Current user info retrive successfylly.',
        data: result,
    })
})


// Get all agents
export const getAllAgents = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllAgents()

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'All agents retrived successfully.',
        data: result
    })
})


// Become an agent
export const becomeAnAgent = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.becomeAnAgent(req.user as JwtPayload)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'Become an agent request is pending. Once approved from Admin you will be an agent. Thank you.',
        data: result
    })
})


// Update user Status
export const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.updateUserStatus(req)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'User status updated.',
        data: result
    })
})

// Change user password
export const changeUserPassword = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.changeUserPassword(req, decodedToken)

    sendResponse(res, {
        statusCode: statusCodes.CREATED,
        success: true,
        message: 'Password changed.',
        data: result
    })
})




export const UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
    getAllAgents,
    becomeAnAgent,
    getMe,
    deleteUser,
    updateUserStatus,
    changeUserPassword
}