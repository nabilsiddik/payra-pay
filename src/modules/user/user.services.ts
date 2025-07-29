import { IAuthProvider, IUser, Provider, Role } from "./user.interfaces"
import User from "./user.models"
import statusCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { enVars } from "../../app/config/env";
import AppError from "../../app/errorHelpers/appError";
import { WALLET_STATUS } from "../wallet/wallet.interfaces";
import Wallet from "../wallet/wallet.models";

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


    // Creating a wallet automatically for users and agents
    const walletPayload = {
        user: newUser._id,
        balance: 50,
        status: WALLET_STATUS.ACTIVE
    }

    let wallet = null
    if(newUser.role !== Role.ADMIN){
        const wallet = await Wallet.create(walletPayload)
    }

    return {
        user: newUser,
        wallet
    }
}

export const UserServices = {
    createUser
}