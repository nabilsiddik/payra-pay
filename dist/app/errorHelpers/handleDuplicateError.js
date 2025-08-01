"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (error) => {
    const duplicate = error.message.match(/"([^"]*)"/);
    return {
        errorStatusCode: 400,
        errorMessage: `${duplicate[1]} already exist.`
    };
};
exports.handleDuplicateError = handleDuplicateError;
