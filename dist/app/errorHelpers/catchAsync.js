"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const env_1 = require("../config/env");
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next).catch((error) => {
        if (env_1.enVars.NODE_ENV === 'development') {
            console.log(error);
        }
        next(error);
    }));
};
exports.catchAsync = catchAsync;
