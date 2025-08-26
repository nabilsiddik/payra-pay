"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const env_1 = require("../config/env");
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        // set access token in cookies
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: env_1.enVars.NODE_ENV === 'production',
            sameSite: 'none',
        });
    }
    if (tokenInfo.refreshToken) {
        // set refresh tokenin cookies
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: env_1.enVars.NODE_ENV === 'production',
            sameSite: 'none',
        });
    }
};
exports.setAuthCookie = setAuthCookie;
