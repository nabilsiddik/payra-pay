"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRequestRouter = void 0;
const express_1 = require("express");
const user_interfaces_1 = require("../user/user.interfaces");
const agentRequest_controllers_1 = require("./agentRequest.controllers");
const checkAuth_1 = require("../../middlewares/checkAuth");
exports.agentRequestRouter = (0, express_1.Router)();
// Handle agent request
exports.agentRequestRouter.patch("/handle-request/:id", (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), agentRequest_controllers_1.AgentRequestControllers.handleAgentRequest);
// Get all agent request
exports.agentRequestRouter.get("/", (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN, user_interfaces_1.Role.USER), agentRequest_controllers_1.AgentRequestControllers.getAllAgentRequest);
