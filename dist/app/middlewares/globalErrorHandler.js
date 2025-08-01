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
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicateError_1 = require("../errorHelpers/handleDuplicateError");
const handleCastError_1 = require("../errorHelpers/handleCastError");
const handleZodError_1 = require("../errorHelpers/handleZodError");
const handleValidationError_1 = require("../errorHelpers/handleValidationError");
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const globalErrorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (env_1.enVars.NODE_ENV === 'development') {
        console.log(error);
    }
    const errorSources = [];
    let errorStatusCode = 500;
    let errorMessage = 'Something went wrong. Internal server error.';
    // Handle duplicate error
    if (error.code === 11000) {
        const duplicateError = (0, handleDuplicateError_1.handleDuplicateError)(error);
        errorStatusCode = duplicateError.errorStatusCode;
        errorMessage = duplicateError.errorMessage;
    }
    // Handle cast error
    else if (error.name === 'CastError') {
        const castError = (0, handleCastError_1.handleCastError)(error);
        errorStatusCode = castError.errorStatusCode;
        errorMessage = castError.errorMessage;
    }
    // Handle zod error
    else if (error.name === 'ZodError') {
        const zodError = (0, handleZodError_1.handleZodError)(error, errorSources);
        errorStatusCode = zodError.errorStatusCode;
        errorMessage = zodError.errorMessage;
    }
    // Handle validation Error
    else if (error.name === "ValidationError") {
        const validationError = (0, handleValidationError_1.handleValidationError)(error, errorSources);
        errorStatusCode = validationError.errorStatusCode;
        errorMessage = validationError.errorMessage;
    }
    // Handle custom App error instance 
    else if (error instanceof appError_1.default) {
        errorStatusCode = error.statusCode,
            errorMessage = error.message;
    }
    // Handle actual js error
    else if (error instanceof Error) {
        errorStatusCode = 500;
        errorMessage = error.message;
    }
    res.status(errorStatusCode).json({
        success: false,
        message: errorMessage,
        error: env_1.enVars.NODE_ENV === 'development' ?
            {
                name: error.name,
                message: error.message,
                errorSources,
                issues: error.issues
            }
            : null,
        stack: env_1.enVars.NODE_ENV === 'development' ? error.stack : null
    });
});
exports.globalErrorHandler = globalErrorHandler;
