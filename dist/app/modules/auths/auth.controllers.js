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
exports.AuthControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const passport_1 = __importDefault(require("passport"));
const catchAsync_1 = require("../../errorHelpers/catchAsync");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const userTokens_1 = require("../../utils/userTokens");
const setCookie_1 = require("../../utils/setCookie");
const sendResponse_1 = require("../../utils/sendResponse");
const env_1 = require("../../config/env");
// Credential login
const credentialLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // throw error if not provided any credential info
    if (!req.body) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Request body not found while credential login.');
    }
    passport_1.default.authenticate("local", (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return next(new appError_1.default(401, error));
        }
        if (!user) {
            return next(new appError_1.default(401, info.message));
        }
        // user tokens
        const userTokens = (0, userTokens_1.createUserTokens)(user);
        // Set access token or refresh token into cookie
        (0, setCookie_1.setAuthCookie)(res, userTokens);
        // Send response
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: 'User Successfully Loged In',
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user
            }
        });
    }))(req, res, next);
}));
// Logout
const logOut = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: env_1.enVars.NODE_ENV === 'production',
        sameSite: false,
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: false,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User loged out successfull",
        data: null,
    });
}));
exports.AuthControllers = {
    credentialLogin,
    logOut
};
