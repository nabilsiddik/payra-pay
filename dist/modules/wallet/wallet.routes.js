"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../app/middlewares/checkAuth");
const user_interfaces_1 = require("../user/user.interfaces");
const wallet_controllers_1 = require("./wallet.controllers");
exports.walletRouter = (0, express_1.Router)();
// Get all wallets
exports.walletRouter.get('/', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), wallet_controllers_1.WalletControllers.getAllWallets);
// Block a wallet
exports.walletRouter.patch('/block/:id', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), wallet_controllers_1.WalletControllers.blockWallet);
// Unblock a wallet
exports.walletRouter.patch('/unblock/:id', (0, checkAuth_1.checkAuth)(user_interfaces_1.Role.ADMIN), wallet_controllers_1.WalletControllers.unblockWallet);
// Deactivate own wallet
exports.walletRouter.patch('/deactivate', (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), wallet_controllers_1.WalletControllers.deactivateOwnWallet);
// Activate own wallet
exports.walletRouter.patch('/activate', (0, checkAuth_1.checkAuth)(...Object.values(user_interfaces_1.Role)), wallet_controllers_1.WalletControllers.activateOwnWallet);
