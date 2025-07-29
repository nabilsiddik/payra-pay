import { Router } from "express";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { TransactionControllers } from "./transaction.controllers";

export const transactionRouter = Router()

// Add money to wallet
transactionRouter.post('/add-money', checkAuth(...Object.values(Role)), TransactionControllers.addMoneyToWallet)

// Withdraw money from wallet
transactionRouter.post('/withdraw-money', checkAuth(...Object.values(Role)), TransactionControllers.withdrawMoneyFromWallet)

// Send money to another wallet
transactionRouter.post('/send-money', checkAuth(...Object.values(Role)), TransactionControllers.sendMoneyToAnotherWallet)
