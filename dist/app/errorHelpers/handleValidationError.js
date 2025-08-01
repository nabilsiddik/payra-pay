"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error, errorSources) => {
    const errors = Object.values(error.errors);
    errors.forEach((errorObj) => {
        errorSources.push({
            path: errorObj.path,
            message: errorObj.message
        });
    });
    return {
        errorStatusCode: 400,
        errorMessage: "validation Error"
    };
};
exports.handleValidationError = handleValidationError;
