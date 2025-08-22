"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletServices = void 0;
const wallet_models_1 = __importDefault(require("./wallet.models"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const wallet_interfaces_1 = require("./wallet.interfaces");
const user_models_1 = __importDefault(require("../user/user.models"));
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
// get all wallets
const getAllWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_models_1.default.find();
    return wallets;
});
// block a wallet
const blockWallet = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    // If wallet id not available
    if (!walletId) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet id not found.');
    }
    const wallet = yield wallet_models_1.default.findById(walletId);
    // If wallet not available
    if (!wallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // If wallet status is already blocked or deactivated
    if (wallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || wallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Wallet is already ${wallet.status}`);
    }
    // Update wallet status
    const updatedWallet = yield wallet_models_1.default.findByIdAndUpdate(walletId, { status: wallet_interfaces_1.WALLET_STATUS.BLOCKED }, { new: true, runValidators: true });
    return updatedWallet;
});
// Unblock a wallet
const unblockWallet = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    // If wallet id not available
    if (!walletId) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet id not found.');
    }
    const wallet = yield wallet_models_1.default.findById(walletId);
    // If wallet not available
    if (!wallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // If wallet status is already blocked or deactivated
    if (wallet.status === wallet_interfaces_1.WALLET_STATUS.ACTIVE) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Wallet is already ${wallet.status}`);
    }
    // Update wallet status
    const updatedWallet = yield wallet_models_1.default.findByIdAndUpdate(walletId, { status: wallet_interfaces_1.WALLET_STATUS.ACTIVE }, { new: true, runValidators: true });
    return updatedWallet;
});
// Deactivate own wallet
const deactivateOwnWallet = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const logedInUser = yield user_models_1.default.findById(currentUser.userId);
    // If logedIn user not available
    if (!logedInUser) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Logged in user not found.');
    }
    // find loged in user wallet
    const loggedInUserWallet = yield wallet_models_1.default.findOne({ user: currentUser.userId });
    // If wallet not available
    if (!loggedInUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // If wallet is blocked by admin
    if (loggedInUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You can not deactivate. Your wallet is blocked.`);
    }
    // If wallet status is already deactivated
    if (loggedInUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Wallet is already Deactivated`);
    }
    // Update wallet status
    const updatedWallet = yield wallet_models_1.default.findByIdAndUpdate(loggedInUserWallet._id, { status: wallet_interfaces_1.WALLET_STATUS.DEACTIVATED }, { new: true, runValidators: true });
    return updatedWallet;
});
// Activate own wallet
const activateOwnWallet = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const logedInUser = yield user_models_1.default.findById(currentUser.userId);
    // If logedIn user not available
    if (!logedInUser) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Logged in user not found.');
    }
    // find loged in user wallet
    const loggedInUserWallet = yield wallet_models_1.default.findOne({ user: currentUser.userId });
    // If wallet not available
    if (!loggedInUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // If wallet is blocked by admin
    if (loggedInUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You can not activate your wallet. Your wallet is blocked.`);
    }
    // If wallet status is already active
    if (loggedInUserWallet.status === wallet_interfaces_1.WALLET_STATUS.ACTIVE) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Wallet is already Active`);
    }
    // Update wallet status
    const updatedWallet = yield wallet_models_1.default.findByIdAndUpdate(loggedInUserWallet._id, { status: wallet_interfaces_1.WALLET_STATUS.ACTIVE }, { new: true, runValidators: true });
    return updatedWallet;
});
exports.WalletServices = {
    getAllWallets,
    blockWallet,
    unblockWallet,
    deactivateOwnWallet,
    activateOwnWallet
};
