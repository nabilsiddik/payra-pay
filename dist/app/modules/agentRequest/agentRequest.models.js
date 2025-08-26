"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const agentRequest_interfaces_1 = require("./agentRequest.interfaces");
// Agent Request schema definition
const agentRequestSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(agentRequest_interfaces_1.AgentRequestStatus),
        required: true,
        default: agentRequest_interfaces_1.AgentRequestStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false,
});
const AgentRequest = (0, mongoose_1.model)('AgentRequest', agentRequestSchema);
exports.default = AgentRequest;
