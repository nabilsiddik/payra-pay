import { IAuthProvider, IUser, Provider, Role } from "./user.interfaces"
import User from "./user.models"
import statusCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { enVars } from "../../app/config/env";
import AppError from "../../app/errorHelpers/appError";
import { CurentUser, WALLET_STATUS } from "../wallet/wallet.interfaces";
import Wallet from "../wallet/wallet.models";
import { JwtPayload } from "jsonwebtoken";
import StatusCodes from "http-status-codes";
import AgentRequest from "../agentRequest/agentRequest.models";
import { AgentRequestStatus, IAgentRequest } from "../agentRequest/agentRequest.interfaces";
import { model, Query, Types } from "mongoose";
import { QueryBuilder } from "../../app/utils/queryBuilder";
import { userSearchableFields } from "./user.constants";


// Service logics for creating a new user
const createUser = async (payload: IUser) => {

    const { email, password, ...rest } = payload

    // Existing user
    const existingUser = await User.findOne({ email })

    // Throw error if existing user
    if (existingUser) {
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

    const wallet = await Wallet.create(walletPayload)

    return {
        user: newUser,
        wallet
    }
}


// Update User
const updateUser = async (currentUser: CurentUser, payload: Partial<IUser>) => {
    const logedInUser = await User.findById(currentUser.userId)

    // If logedIn user not available
    if(!logedInUser){
        throw new AppError(StatusCodes.NOT_FOUND, 'Logged in user not found.')
    }

    const updatedUser = await User.findByIdAndUpdate(currentUser.userId, payload, {new: true, runValidators: true})

    return updatedUser
}


// Get all users
const getAllUsers = async (query: Record<string, string>) => {

    // search, filter, sort, fields, paginate using query builder
    const queryBuilder = new QueryBuilder(User.find(), query)

    const users = await queryBuilder
    .search(userSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()

    const [data, meta] = await Promise.all([
        users.build(),
        queryBuilder.getMeta()
    ])

    return {
        users: data,
        meta
    }
}

// Get all agents
const getAllAgents = async () => {
    const users = await User.find({ role: Role.AGENT }).select('-password')
    return users
}

// Become an agent
const becomeAnAgent = async (payload: JwtPayload) => {
    const { userId } = payload

    // If user id not available
    if (!userId) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User id not found.')
    }

    const userObjectId = new Types.ObjectId(userId)
    const existingRequests = await AgentRequest.find({ user: userObjectId }).sort({ createdAt: -1 })

    const lastRequest = existingRequests[0]

    // check if last requests status is pending or approved or suspended
    if (lastRequest) {
        if (lastRequest.status === AgentRequestStatus.PENDING || lastRequest.status === AgentRequestStatus.APPROVED) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'You have already applied. Your status is on pending or approved.')
        }
    }

    const agentRequestPayload: IAgentRequest = {
        user: userId
    }

    // Create become agent request
    const agentRequest = await AgentRequest.create(agentRequestPayload)

    return agentRequest

}

export const UserServices = {
    createUser,
    updateUser,
    getAllUsers,
    getAllAgents,
    becomeAnAgent
}