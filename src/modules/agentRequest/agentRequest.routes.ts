import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { AgentRequestControllers } from "./agentRequest.controllers";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { agentRequestPayloadZodSchema } from './agentRequest.validations';

export const agentRequestRouter = Router()

// Handle agent request
agentRequestRouter.patch("/handle-request/:id", validateRequest(agentRequestPayloadZodSchema), checkAuth(Role.ADMIN), AgentRequestControllers.handleAgentRequest);