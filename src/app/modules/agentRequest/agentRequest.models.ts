import {model, Schema} from 'mongoose'
import { AgentRequestStatus } from './agentRequest.interfaces'

// Agent Request schema definition
const agentRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(AgentRequestStatus),
        required: true,
        default: AgentRequestStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false,
})

const AgentRequest = model('AgentRequest', agentRequestSchema)

export default AgentRequest