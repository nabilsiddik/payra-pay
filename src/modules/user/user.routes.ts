import { Router } from "express";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { UserControllers } from "./user.controllers";

export const userRouter = Router()

// Register a new user
userRouter.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);