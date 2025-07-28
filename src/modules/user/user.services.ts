import { IAuthProvider, IUser, Provider } from "./user.interfaces"
import User from "./user.models"
import statusCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { enVars } from "../../app/config/env";
import AppError from "../../app/errorHelpers/appError";

// Service logics for creating a new user
const createUser = async(payload: IUser) => {

    const {email, password, ...rest} = payload

    // Existing user
    const existingUser = await User.findOne({email})

    // Throw error if existing user
    if(existingUser){
        throw new AppError(statusCodes.BAD_REQUEST, 'User already exist.')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password as string, Number(enVars.SALT_ROUND))

    // Make a credential auth provider
    const authProvider: IAuthProvider = {
        provider: Provider.CREDENTIALS,
        providerId: email
    }

    const user = {
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    }

    // create user
    const newUser = await User.create(user)
    newUser.save()

    return newUser
}

export const UserServices = {
    createUser
}