import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { WalletControllers } from "./wallet.controllers";

export const walletRouter = Router()

// Get all wallets
walletRouter.get('/', checkAuth(Role.ADMIN), WalletControllers.getAllWallets)

// Block a wallet
walletRouter.patch('/block/:id', checkAuth(Role.ADMIN), WalletControllers.blockWallet)

// Unblock a wallet
walletRouter.patch('/unblock/:id', checkAuth(Role.ADMIN), WalletControllers.unblockWallet)

// Deactivate own wallet
walletRouter.patch('/deactivate', checkAuth(...Object.values(Role)), WalletControllers.deactivateOwnWallet)

// Activate own wallet
walletRouter.patch('/activate', checkAuth(...Object.values(Role)), WalletControllers.activateOwnWallet)

