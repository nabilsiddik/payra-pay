import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { WalletControllers } from "./wallet.controllers";

export const walletRouter = Router()

// Add money to wallet
walletRouter.get('/', checkAuth(Role.ADMIN), WalletControllers.getAllWallets)

