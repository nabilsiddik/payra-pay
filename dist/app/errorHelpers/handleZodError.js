"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const env_1 = require("../config/env");
const handleZodError = (error, errorSources) => {
    if (env_1.enVars.NODE_ENV === 'development') {
        console.log(error);
    }
    error.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        errorStatusCode: 400,
        errorMessage: 'Zod Validation Error.'
    };
};
exports.handleZodError = handleZodError;
