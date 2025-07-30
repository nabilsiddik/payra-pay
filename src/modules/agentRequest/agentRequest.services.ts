import { Request } from "express"
import AppError from "../../app/errorHelpers/appError"
import statusCodes from 'http-status-codes'
import AgentRequest from "./agentRequest.models"
import { HandleAgentPayloadType } from "./agentRequest.interfaces"


const handleAgentRequest = async(req: Request) => {
    const agentReqId = req.params.id
    const {status}: HandleAgentPayloadType = req.body

    if(!status){
        throw new AppError(statusCodes.BAD_REQUEST, 'Status not available.')
    }

    // find agent Request
    const agentRequest = await AgentRequest.findById(agentReqId)

    if(!agentRequest){
        throw new AppError(statusCodes.NOT_FOUND, 'Agent request not found.')
    }

    // Update agent request status
    const updatedAgentRequestStaus = await AgentRequest.findByIdAndUpdate(agentReqId, {status}, {new: true})

    return updatedAgentRequestStaus

}

export const AgentRequestServices = {
    handleAgentRequest
}