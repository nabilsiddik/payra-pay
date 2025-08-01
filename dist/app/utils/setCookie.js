"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        // set access token in cookies
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        });
    }
    if (tokenInfo.refreshToken) {
        // set refresh tokenin cookies
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false
        });
    }
};
exports.setAuthCookie = setAuthCookie;
