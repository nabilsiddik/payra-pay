"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = exports.changeUserPassword = exports.updateUserStatus = exports.becomeAnAgent = exports.getAllAgents = exports.getMe = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_services_1 = require("./user.services");
const catchAsync_1 = require("../../errorHelpers/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
// User registration
exports.createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const newUser = yield user_services_1.UserServices.createUser(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'New user created.',
        data: newUser
    });
}));
// Update user
exports.updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_services_1.UserServices.updateUser(req.user, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User updated.',
        data: result
    });
}));
// delete user
exports.deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield user_services_1.UserServices.deleteUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User Deleted.',
        data: result
    });
}));
// Get all users
exports.getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield user_services_1.UserServices.getAllUsers(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'All user retrived successfully.',
        data: result.users,
        meta: result.meta
    });
}));
// Get me
exports.getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_services_1.UserServices.getMe(decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'Current user info retrive successfylly.',
        data: result,
    });
}));
// Get all agents
exports.getAllAgents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.getAllAgents();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'All agents retrived successfully.',
        data: result
    });
}));
// Become an agent
exports.becomeAnAgent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.becomeAnAgent(req.user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'Become an agent request is pending. Once approved from Admin you will be an agent. Thank you.',
        data: result
    });
}));
// Update user Status
exports.updateUserStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.updateUserStatus(req);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'User status updated.',
        data: result
    });
}));
// Change user password
exports.changeUserPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_services_1.UserServices.changeUserPassword(req, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'Password changed.',
        data: result
    });
}));
exports.UserControllers = {
    createUser: exports.createUser,
    updateUser: exports.updateUser,
    getAllUsers: exports.getAllUsers,
    getAllAgents: exports.getAllAgents,
    becomeAnAgent: exports.becomeAnAgent,
    getMe: exports.getMe,
    deleteUser: exports.deleteUser,
    updateUserStatus: exports.updateUserStatus,
    changeUserPassword: exports.changeUserPassword
};
