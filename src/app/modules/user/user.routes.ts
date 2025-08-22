import { Router } from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validations";
import { UserControllers } from "./user.controllers";
import { Role } from "./user.interfaces";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

export const userRouter = Router()

// Register a new user
userRouter.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);
// Update user
userRouter.patch("/", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser);
// Delete user
userRouter.delete("/:id",  checkAuth(Role.ADMIN), UserControllers.deleteUser);
// get all users
userRouter.get("/", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
// get loged in user
userRouter.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);
// get all agents
userRouter.get("/agents", checkAuth(Role.ADMIN), UserControllers.getAllAgents);
// apply to become agent
userRouter.post("/agents/become-agent", checkAuth(Role.USER), UserControllers.becomeAnAgent);