"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRequestRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../app/middlewares/checkAuth");
const user_interfaces_1 = require("../user/user.interfaces");
const agentRequest_controllers_1 = require("./agentRequest.controllers");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const agentRequest_validations_1 = require("./agentRequest.validations");
exports.agentRequestRouter = (0, express_1.Router)();
// Handle agent request
exports.agentRequestRouter.patch("/handle-request/:id", (0, validateRequest_1.validateRequest)(agentRequest_validations_1.agentRequestPayloadZodSchema), (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), agentRequest_controllers_1.AgentRequestControllers.handleAgentRequest);
