"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interfaces_1 = require("./user.interfaces");
// Crate user zod schema
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name can not be more that 50 characters.' }),
    email: zod_1.default.string()
        .email({ message: 'Email is invalid.' }),
    password: zod_1.default.string().
        min(8, { message: 'Password minimum length is 8.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, one special character and one number.' }),
    phone: zod_1.default.string()
        .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'Invalid Phone Number.' }),
    address: zod_1.default.string()
        .max(200, { message: 'Address can not exced 200 characters.' })
        .optional()
});
// Update user zod schema
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(50, { message: 'Name can not be more that 50 characters.' })
        .optional(),
    password: zod_1.default.string().
        min(8, { message: 'Password minimum length is 8.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, one special character and one number.' })
        .optional(),
    address: zod_1.default.string()
        .max(200, { message: 'Address can not exced 200 characters.' })
        .optional(),
    role: zod_1.default.enum(Object.values(user_interfaces_1.Role))
        .optional(),
    isActive: zod_1.default.enum(Object.values(user_interfaces_1.IsActive))
        .optional(),
    isDeleted: zod_1.default.boolean()
        .optional(),
    isVerified: zod_1.default.boolean()
        .optional()
});
