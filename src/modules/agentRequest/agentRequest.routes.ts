import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { AgentRequestControllers } from "./agentRequest.controllers";

export const agentRequestRouter = Router()

// Handle agent request
agentRequestRouter.post("/handle-request/:id", checkAuth(Role.ADMIN), AgentRequestControllers.handleAgentRequest);