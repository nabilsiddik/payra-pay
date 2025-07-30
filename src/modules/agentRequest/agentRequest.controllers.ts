import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../app/errorHelpers/catchAsync"
import { sendResponse } from "../../app/utils/sendResponse"
import { AgentRequestServices } from "./agentRequest.services"
import statusCodes from 'http-status-codes'
import { JwtPayload } from "jsonwebtoken"

// Handle agent request
export const handleAgentRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AgentRequestServices.handleAgentRequest(req)

    sendResponse(res, {
        statusCode: statusCodes.OK,
        success: true,
        message: 'Agent Request updated.',
        data: result
    })
})


export const AgentRequestControllers = {
    handleAgentRequest
}