import { Response } from "express"
import { enVars } from "../config/env"

export interface AuthTokens {
    accessToken?: string,
    refreshToken?: string
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    if (tokenInfo.accessToken) {
        // set access token in cookies
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: enVars.NODE_ENV === 'production',
            // sameSite: 'none',
        })
    }

    if (tokenInfo.refreshToken) {
        // set refresh tokenin cookies
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: enVars.NODE_ENV === 'production',
            // sameSite: 'none',
        })
    }
}