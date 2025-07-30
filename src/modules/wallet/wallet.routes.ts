import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { WalletControllers } from "./wallet.controllers";

export const walletRouter = Router()

// Get all wallets
walletRouter.get('/', checkAuth(Role.ADMIN), WalletControllers.getAllWallets)

// Block a wallet
walletRouter.post('/block/:id', checkAuth(Role.ADMIN), WalletControllers.blockWallet)

// Unblock a wallet
walletRouter.post('/unblock/:id', checkAuth(Role.ADMIN), WalletControllers.unblockWallet)

