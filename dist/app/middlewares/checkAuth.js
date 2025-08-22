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
exports.checkAuth = void 0;
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../utils/jwt");
const env_1 = require("../config/env");
const user_models_1 = __importDefault(require("../modules/user/user.models"));
const user_interfaces_1 = require("../modules/user/user.interfaces");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Access token not found.');
        }
        // Check if the token is verified
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.enVars.JWT_ACCESS_SECRET);
        // Find the existing user 
        const existingUser = yield user_models_1.default.findOne({ email: verifiedToken.email });
        // If user does not exist
        if (!existingUser) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User does not exist.');
        }
        // // If user is not verified
        // if(!existingUser.isVerified){
        //     throw new AppError(StatusCodes.BAD_REQUEST, 'User is not verified.')
        // }
        // If user is blocked or inactive
        if (existingUser.isActive === user_interfaces_1.IsActive.BLOCKED || existingUser.isActive === user_interfaces_1.IsActive.INACTIVE) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${existingUser.isActive}`);
        }
        // If user is deleted
        if (existingUser.isDateleted) {
            throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is Deleted`);
        }
        // If user is not permitted, means user role does not allow to visit that route
        if (!authRoles.includes(verifiedToken.role)) {
            throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, `You are not permitted to access this route.`);
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        if (env_1.enVars.NODE_ENV === 'development') {
            console.log(error);
        }
        next(error);
    }
});
exports.checkAuth = checkAuth;
