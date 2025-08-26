import statusCodes from 'http-status-codes'
import AgentRequest from "./agentRequest.models"
import { AgentRequestStatus } from "./agentRequest.interfaces"
import AppError from "../../errorHelpers/appError"
import { Request } from 'express'
import User from '../user/user.models'
import { Role } from '../user/user.interfaces'

// Handle agent request
const handleAgentRequest = async (req: Request) => {
    const agentReqId = req.params.id
    console.log('abu', agentReqId)
    const { status } = req.body

    if (!status) {
        throw new AppError(statusCodes.BAD_REQUEST, 'Status not available.')
    }

    // find agent Request
    const agentRequest = await AgentRequest.findById(agentReqId)

    if (!agentRequest) {
        throw new AppError(statusCodes.NOT_FOUND, 'Agent request not found.')
    }

    // Update agent request status
    const updatedAgentRequestStaus = await AgentRequest.findByIdAndUpdate(agentReqId, { status }, { new: true, runValidators: true })

    const agentToUpdate = await User.findById(agentRequest?.user)

    if(!agentToUpdate){
        throw new AppError(statusCodes.NOT_FOUND, 'Agent not found while update his role.')
    }

    if (status === AgentRequestStatus.PENDING) {
        agentToUpdate.role = Role.USER
        await agentToUpdate?.save()
    }else if(status === AgentRequestStatus.APPROVED){
        agentToUpdate.role = Role.AGENT
        await agentToUpdate?.save()
    }
    else if(status === AgentRequestStatus.SUSPENDED){
        agentToUpdate.role = Role.USER
        await agentToUpdate?.save()
    }

    return updatedAgentRequestStaus

}

// Get all agent request
const getAllAgentRequest = async () => {
    const agentRequests = await AgentRequest.find()
    return agentRequests
}


export const AgentRequestServices = {
    handleAgentRequest,
    getAllAgentRequest
}