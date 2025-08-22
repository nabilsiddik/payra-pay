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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_models_1 = __importDefault(require("../modules/user/user.models"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user actually exist
        const existingUser = yield user_models_1.default.findOne({ email });
        if (!existingUser) {
            return done(null, false, { message: 'User does not exist.' });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return done(null, false, { message: "Invalid Passowrd" });
        }
        return done(null, existingUser);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
})));
