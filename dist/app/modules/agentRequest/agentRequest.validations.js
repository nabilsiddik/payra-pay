"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRequestPayloadZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const agentRequest_interfaces_1 = require("./agentRequest.interfaces");
// Agent reuqest payload zod schema
exports.agentRequestPayloadZodSchema = zod_1.default.object({
    status: zod_1.default.nativeEnum(agentRequest_interfaces_1.AgentRequestStatus)
});
