import { Router } from "express";
import { Role } from "../user/user.interfaces";
import { AgentRequestControllers } from "./agentRequest.controllers";
import { checkAuth } from "../../middlewares/checkAuth";

export const agentRequestRouter = Router()

// Handle agent request
agentRequestRouter.patch("/handle-request/:id", checkAuth(Role.ADMIN), AgentRequestControllers.handleAgentRequest);

// Get all agent request
agentRequestRouter.get("/", checkAuth(Role.ADMIN, Role.USER), AgentRequestControllers.getAllAgentRequest);