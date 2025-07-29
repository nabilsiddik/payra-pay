import AppError from "../../app/errorHelpers/appError"
import User from "../user/user.models"
import statusCodes from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { enVars } from "../../app/config/env"
import { crateUserTokens } from "../../app/utils/userTokens"

const credentialLogin = async (email: string, password: string) => {
    // check if user actually exist
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new AppError(statusCodes.BAD_REQUEST, 'User does not exist.')
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password as string)

    if (!isPasswordMatch) {
        throw new AppError(statusCodes.UNAUTHORIZED, 'Invalid Password.')
    }

    // get user tokens
    const userTokens = crateUserTokens(existingUser)

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken
    }
}

export const AuthServices = {
    credentialLogin
}