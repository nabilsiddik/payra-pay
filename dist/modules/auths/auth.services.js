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
exports.AuthServices = void 0;
const appError_1 = __importDefault(require("../../app/errorHelpers/appError"));
const user_models_1 = __importDefault(require("../user/user.models"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userTokens_1 = require("../../app/utils/userTokens");
const credentialLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user actually exist
    const existingUser = yield user_models_1.default.findOne({ email });
    if (!existingUser) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User does not exist.');
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!isPasswordMatch) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Invalid Password.');
    }
    // get user tokens
    const userTokens = (0, userTokens_1.createUserTokens)(existingUser);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken
    };
});
exports.AuthServices = {
    credentialLogin
};
