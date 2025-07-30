import { Router } from "express";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { UserControllers } from "./user.controllers";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "./user.interfaces";

export const userRouter = Router()

// Register a new user
userRouter.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);
// get all users
userRouter.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
// get all agents
userRouter.get("/agents", checkAuth(Role.ADMIN), UserControllers.getAllAgents);
// apply to become agent
userRouter.post("/agents/become-agent", checkAuth(Role.USER), UserControllers.becomeAnAgent);