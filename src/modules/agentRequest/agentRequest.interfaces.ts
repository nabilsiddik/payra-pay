import { Types } from "mongoose";

export enum AgentRequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    SUSPENDED = 'SUSPENDED'
}

export interface IAgentRequest{
    user: Types.ObjectId,
    status?: AgentRequestStatus,
}