"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const env_1 = require("../config/env");
const handleCastError = (error) => {
    if (env_1.enVars.NODE_ENV === 'development') {
        console.log(error);
    }
    return {
        errorStatusCode: 400,
        errorMessage: 'Invalid Object id'
    };
};
exports.handleCastError = handleCastError;
