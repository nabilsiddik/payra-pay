"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_validations_1 = require("./user.validations");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const user_controllers_1 = require("./user.controllers");
const checkAuth_1 = require("../../app/middlewares/checkAuth");
const user_interfaces_1 = require("./user.interfaces");
exports.userRouter = (0, express_1.Router)();
// Register a new user
exports.userRouter.post("/register", (0, validateRequest_1.validateRequest)(user_validations_1.createUserZodSchema), user_controllers_1.UserControllers.createUser);
// Update user
exports.userRouter.patch("/", (0, validateRequest_1.validateRequest)(user_validations_1.updateUserZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), user_controllers_1.UserControllers.updateUser);
// get all users
exports.userRouter.get("/", (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), user_controllers_1.UserControllers.getAllUsers);
// get all agents
exports.userRouter.get("/agents", (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), user_controllers_1.UserControllers.getAllAgents);
// apply to become agent
exports.userRouter.post("/agents/become-agent", (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.USER), user_controllers_1.UserControllers.becomeAnAgent);
