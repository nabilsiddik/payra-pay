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

// view all transaction history
transactionRouter.get('/history', checkAuth(...Object.values(Role)), TransactionControllers.getAllTransactionHistory)

// Cash in to any user wallet by agent only
transactionRouter.post('/cash-in', checkAuth(Role.AGENT), TransactionControllers.cashIn)

// Cash out from any user wallet by agent only
transactionRouter.post('/cash-out', checkAuth(Role.USER), TransactionControllers.cashOut)

// Get all transactions
transactionRouter.get('/', checkAuth(Role.ADMIN), TransactionControllers.getAllTransactions)


