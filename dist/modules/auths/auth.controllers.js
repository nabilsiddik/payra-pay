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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const sendResponse_1 = require("../../app/utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../app/errorHelpers/appError"));
const catchAsync_1 = require("../../app/errorHelpers/catchAsync");
const passport_1 = __importDefault(require("passport"));
const userTokens_1 = require("../../app/utils/userTokens");
const setCookie_1 = require("../../app/utils/setCookie");
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
        // Take the rest of the user info without password
        const _a = user.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
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
                user: rest
            }
        });
    }))(req, res, next);
}));
exports.AuthControllers = {
    credentialLogin
};
