import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { WalletControllers } from "./wallet.controllers";

export const walletRouter = Router()

// Add money to wallet
walletRouter.post('/add-money', checkAuth(...Object.values(Role)), WalletControllers.addMoneyToWallet)

// Withdraw money from wallet
walletRouter.post('/withdraw-money', checkAuth(...Object.values(Role)), WalletControllers.withdrawMoneyFromWallet)
