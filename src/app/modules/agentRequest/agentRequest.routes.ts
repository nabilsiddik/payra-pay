import { Router } from "express";
import { Role } from "../user/user.interfaces";
import { AgentRequestControllers } from "./agentRequest.controllers";
import { agentRequestPayloadZodSchema } from './agentRequest.validations';
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

export const agentRequestRouter = Router()

// Handle agent request
agentRequestRouter.patch("/handle-request/:id", validateRequest(agentRequestPayloadZodSchema), checkAuth(Role.ADMIN), AgentRequestControllers.handleAgentRequest);