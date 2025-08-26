"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRequestServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const agentRequest_models_1 = __importDefault(require("./agentRequest.models"));
const agentRequest_interfaces_1 = require("./agentRequest.interfaces");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const user_models_1 = __importDefault(require("../user/user.models"));
const user_interfaces_1 = require("../user/user.interfaces");
// Handle agent request
const handleAgentRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const agentReqId = req.params.id;
    console.log('abu', agentReqId);
    const { status } = req.body;
    if (!status) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Status not available.');
    }
    // find agent Request
    const agentRequest = yield agentRequest_models_1.default.findById(agentReqId);
    if (!agentRequest) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent request not found.');
    }
    // Update agent request status
    const updatedAgentRequestStaus = yield agentRequest_models_1.default.findByIdAndUpdate(agentReqId, { status }, { new: true, runValidators: true });
    const agentToUpdate = yield user_models_1.default.findById(agentRequest === null || agentRequest === void 0 ? void 0 : agentRequest.user);
    if (!agentToUpdate) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent not found while update his role.');
    }
    if (status === agentRequest_interfaces_1.AgentRequestStatus.PENDING) {
        agentToUpdate.role = user_interfaces_1.Role.USER;
        yield (agentToUpdate === null || agentToUpdate === void 0 ? void 0 : agentToUpdate.save());
    }
    else if (status === agentRequest_interfaces_1.AgentRequestStatus.APPROVED) {
        agentToUpdate.role = user_interfaces_1.Role.AGENT;
        yield (agentToUpdate === null || agentToUpdate === void 0 ? void 0 : agentToUpdate.save());
    }
    else if (status === agentRequest_interfaces_1.AgentRequestStatus.SUSPENDED) {
        agentToUpdate.role = user_interfaces_1.Role.USER;
        yield (agentToUpdate === null || agentToUpdate === void 0 ? void 0 : agentToUpdate.save());
    }
    return updatedAgentRequestStaus;
});
// Get all agent request
const getAllAgentRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const agentRequests = yield agentRequest_models_1.default.find();
    return agentRequests;
});
exports.AgentRequestServices = {
    handleAgentRequest,
    getAllAgentRequest
};
