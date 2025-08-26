"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interfaces_1 = require("./user.interfaces");
// Auth provider schema definition
const authProviderSchema = new mongoose_1.Schema({
    provider: {
        type: String,
        enum: Object.values(user_interfaces_1.Provider),
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    }
}, {
    timestamps: false,
    _id: false,
    versionKey: false,
});
// User schema definition
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
    },
    address: {
        type: String,
        default: ''
    },
    isDateleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: Object.values(user_interfaces_1.Status),
        default: user_interfaces_1.Status.ACTIVE,
    },
    role: {
        type: String,
        enum: Object.values(user_interfaces_1.Role),
        default: user_interfaces_1.Role.USER,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    auths: [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
