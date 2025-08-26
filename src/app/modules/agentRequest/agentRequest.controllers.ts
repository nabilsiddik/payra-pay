import { Request, Response } from "express"
import { AgentRequestServices } from "./agentRequest.services"
import statusCodes from 'http-status-codes'
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../errorHelpers/catchAsync"

// Handle agent request
export const handleAgentRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await AgentRequestServices.handleAgentRequest(req)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Agent Request updated.',
        data: result
    })
})

// Get all agent request
export const getAllAgentRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await AgentRequestServices.getAllAgentRequest()

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'All Agent Request retrived.',
        data: result
    })
})


export const AgentRequestControllers = {
    handleAgentRequest,
    getAllAgentRequest
}