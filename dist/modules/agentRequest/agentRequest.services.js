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
const appError_1 = __importDefault(require("../../app/errorHelpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const agentRequest_models_1 = __importDefault(require("./agentRequest.models"));
const handleAgentRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const agentReqId = req.params.id;
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
    const updatedAgentRequestStaus = yield agentRequest_models_1.default.findByIdAndUpdate(agentReqId, { status }, { new: true });
    return updatedAgentRequestStaus;
});
exports.AgentRequestServices = {
    handleAgentRequest
};
