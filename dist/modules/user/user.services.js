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
exports.UserServices = void 0;
const user_interfaces_1 = require("./user.interfaces");
const user_models_1 = __importDefault(require("./user.models"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../app/config/env");
const appError_1 = __importDefault(require("../../app/errorHelpers/appError"));
const wallet_interfaces_1 = require("../wallet/wallet.interfaces");
const wallet_models_1 = __importDefault(require("../wallet/wallet.models"));
const http_status_codes_2 = __importDefault(require("http-status-codes"));
const agentRequest_models_1 = __importDefault(require("../agentRequest/agentRequest.models"));
const agentRequest_interfaces_1 = require("../agentRequest/agentRequest.interfaces");
const mongoose_1 = require("mongoose");
const queryBuilder_1 = require("../../app/utils/queryBuilder");
const user_constants_1 = require("./user.constants");
// Service logics for creating a new user
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload
    // Existing user
    , ["email", "password"]);
    // Existing user
    const existingUser = yield user_models_1.default.findOne({ email });
    // Throw error if existing user
    if (existingUser) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User already exist.');
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.enVars.SALT_ROUND));
    // Make a credential auth provider
    const authProvider = {
        provider: user_interfaces_1.Provider.CREDENTIALS,
        providerId: email
    };
    const user = Object.assign({ email, password: hashedPassword, auths: [authProvider] }, rest);
    // create user
    const newUser = yield user_models_1.default.create(user);
    newUser.save();
    // Creating a wallet automatically for users and agents
    const walletPayload = {
        user: newUser._id,
        balance: 50,
        status: wallet_interfaces_1.WALLET_STATUS.ACTIVE
    };
    const wallet = yield wallet_models_1.default.create(walletPayload);
    return {
        user: newUser,
        wallet
    };
});
// Update User
const updateUser = (currentUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const logedInUser = yield user_models_1.default.findById(currentUser.userId);
    // If logedIn user not available
    if (!logedInUser) {
        throw new appError_1.default(http_status_codes_2.default.NOT_FOUND, 'Logged in user not found.');
    }
    const updatedUser = yield user_models_1.default.findByIdAndUpdate(currentUser.userId, payload, { new: true, runValidators: true });
    return updatedUser;
});
// Get all users
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // search, filter, sort, fields, paginate using query builder
    const queryBuilder = new queryBuilder_1.QueryBuilder(user_models_1.default.find(), query);
    const users = yield queryBuilder
        .search(user_constants_1.userSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        users.build(),
        queryBuilder.getMeta()
    ]);
    return {
        users: data,
        meta
    };
});
// Get all agents
const getAllAgents = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_models_1.default.find({ role: user_interfaces_1.Role.AGENT }).select('-password');
    return users;
});
// Become an agent
const becomeAnAgent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    // If user id not available
    if (!userId) {
        throw new appError_1.default(http_status_codes_2.default.NOT_FOUND, 'User id not found.');
    }
    const userObjectId = new mongoose_1.Types.ObjectId(userId);
    const existingRequests = yield agentRequest_models_1.default.find({ user: userObjectId }).sort({ createdAt: -1 });
    const lastRequest = existingRequests[0];
    // check if last requests status is pending or approved or suspended
    if (lastRequest) {
        if (lastRequest.status === agentRequest_interfaces_1.AgentRequestStatus.PENDING || lastRequest.status === agentRequest_interfaces_1.AgentRequestStatus.APPROVED) {
            throw new appError_1.default(http_status_codes_2.default.BAD_REQUEST, 'You have already applied. Your status is on pending or approved.');
        }
    }
    const agentRequestPayload = {
        user: userId
    };
    // Create become agent request
    const agentRequest = yield agentRequest_models_1.default.create(agentRequestPayload);
    return agentRequest;
});
exports.UserServices = {
    createUser,
    updateUser,
    getAllUsers,
    getAllAgents,
    becomeAnAgent
};
