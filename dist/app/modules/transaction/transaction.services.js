"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.TransactionServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const mongoose_1 = __importStar(require("mongoose"));
const wallet_interfaces_1 = require("../wallet/wallet.interfaces");
const wallet_models_1 = __importDefault(require("../wallet/wallet.models"));
const transaction_interfaces_1 = require("./transaction.interfaces");
const transaction_models_1 = __importStar(require("./transaction.models"));
const user_models_1 = __importDefault(require("../user/user.models"));
const user_interfaces_1 = require("../user/user.interfaces");
const transaction_constants_1 = require("./transaction.constants");
const queryBuilder_1 = require("../../utils/queryBuilder");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
// get all transactions
const getAllTransactions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // search, filter, sort, fields, paginate using query builder
    const queryBuilder = new queryBuilder_1.QueryBuilder(transaction_models_1.default.find().populate("user", "name email"), query);
    const transactions = yield queryBuilder
        .search(transaction_constants_1.transactionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        transactions.build(),
        queryBuilder.getMeta()
    ]);
    return {
        transactions: data,
        meta
    };
});
// Business logics of add money to wallet
const addMoneyToWallet = (req, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    // amount to be added
    const { balance } = payload;
    const userId = decodedToken.userId;
    console.log(balance);
    if (balance === 0) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Balance must be greater than 0.');
    }
    if (!req.user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // make user id to a mongoose object id
    const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
    // find the current user wallet
    const currentUserWallet = yield wallet_models_1.default.findOne({ user: objectUserId });
    if (!currentUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // Check if wallet is blocked or deactivated
    if (currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${currentUserWallet.status}`);
    }
    // Updated the wallet balance
    currentUserWallet.balance += Number(balance);
    yield (currentUserWallet === null || currentUserWallet === void 0 ? void 0 : currentUserWallet.save());
    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: transaction_interfaces_1.TRANSACTION_TYPES.ADD_MONEY,
        amount: balance,
        status: transaction_interfaces_1.TRANSACTION_STATUS.COMPLETED,
    };
    const transaction = yield transaction_models_1.default.create(transactionPayload);
    return {
        wallet: currentUserWallet,
        transaction
    };
});
// Business logics of withdraw money from wallet
const withdrawMoneyFromWallet = (req, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    // amount to withdraw
    const { balance } = payload;
    const userId = decodedToken.userId;
    if (balance === 0) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Balance not available.');
    }
    if (!balance) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Withdrawl amount not found.');
    }
    if (!req.user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // make user id to a mongoose object id
    const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
    // find the current user wallet
    const currentUserWallet = yield wallet_models_1.default.findOne({ user: objectUserId });
    if (!currentUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Wallet not found.');
    }
    // Check if wallet is blocked or deactivated
    if (currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${currentUserWallet.status}`);
    }
    // check if insufficient balance
    if (currentUserWallet.balance < balance) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Insufficient balance to withdraw.');
    }
    // Updated the wallet balance
    currentUserWallet.balance -= Number(balance);
    yield (currentUserWallet === null || currentUserWallet === void 0 ? void 0 : currentUserWallet.save());
    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: transaction_interfaces_1.TRANSACTION_TYPES.WITHDRAW_MONEY,
        amount: balance,
        status: transaction_interfaces_1.TRANSACTION_STATUS.COMPLETED,
    };
    const transaction = yield transaction_models_1.default.create(transactionPayload);
    return {
        wallet: currentUserWallet,
        transaction
    };
});
// Send money to another wallet
const sendMoneyToAnotherWallet = (req, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, numberTo } = payload;
    const userId = decodedToken.userId;
    // Get sendmoney charge in percentage
    const transactionParameter = yield transaction_models_1.TransactionParameter.findOne();
    if (!transactionParameter) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Transacton parameter not found.');
    }
    const sendMoneyChargeInPercentage = transactionParameter.sendMoneyCharge;
    // calculate send money charge
    const sendMoneyCharge = Number(amount) * (Number(sendMoneyChargeInPercentage) / 100);
    // Total amount with send money charge
    const totalAmountWithSendMoneyCharge = Number(amount) + sendMoneyCharge;
    if (!req.user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // User from send money
    const userFromSendMoney = yield user_models_1.default.findById(userId);
    if (!userFromSendMoney) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'User is not available.');
    }
    // find current user wallet
    const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
    const currentUserWallet = yield wallet_models_1.default.findOne({ user: userId });
    if (!currentUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Current user wallet not available.');
    }
    // check if insufficient balance
    if (currentUserWallet.balance < Number(totalAmountWithSendMoneyCharge)) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Insufficient balance to send money.');
    }
    // Check if wallet is blocked or deactivated
    if (currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || currentUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${currentUserWallet.status}`);
    }
    // find the user to send money
    const userToSendMOney = yield user_models_1.default.findOne({ phone: numberTo });
    if (!userToSendMOney) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'The user you are trying to send money is not available.');
    }
    // find user wallet to send money
    const toUserWallet = yield wallet_models_1.default.findOne({ user: userToSendMOney });
    if (!toUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'To user wallet not available.');
    }
    // Check if wallet is blocked or deactivated
    if (toUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || toUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. The user wallet you trying to send money is ${currentUserWallet.status}`);
    }
    // Minus balance from current user wallet
    currentUserWallet.balance -= Number(totalAmountWithSendMoneyCharge);
    yield currentUserWallet.save();
    // Add balance to user wallet
    toUserWallet.balance += Number(amount);
    yield toUserWallet.save();
    // Create transaction
    const transactionPayload = {
        user: objectUserId,
        type: transaction_interfaces_1.TRANSACTION_TYPES.SEND_MONEY,
        amount: Number(amount),
        totalAmountWithCharge: totalAmountWithSendMoneyCharge,
        charge: sendMoneyCharge,
        numberFrom: userFromSendMoney.phone,
        numberTo: userToSendMOney.phone,
        status: transaction_interfaces_1.TRANSACTION_STATUS.COMPLETED,
    };
    const transaction = yield transaction_models_1.default.create(transactionPayload);
    return {
        currentUserWallet,
        toUserWallet,
        transaction
    };
});
// Get all transaction history
const getAllTransactionHistory = (req, decodedToken, query) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = decodedToken.userId;
    const user = yield user_models_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // convert userId to an object id
    const objectUserId = new mongoose_1.Types.ObjectId(userId);
    // search, filter, sort, fields, paginate using query builder
    const queryBuilder = new queryBuilder_1.QueryBuilder(transaction_models_1.default.find({
        $or: [{ user: objectUserId }, { agent: objectUserId }]
    }).populate("user", "name email"), query);
    const transactions = yield queryBuilder
        .search(transaction_constants_1.transactionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    if (!transactions) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'No transaction available.');
    }
    const [data, meta] = yield Promise.all([
        transactions.build(),
        queryBuilder.getMeta()
    ]);
    return {
        transactions: data,
        meta
    };
});
// Cash in to any user wallet by an agent only
const cashIn = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, amount } = payload;
    const userId = decodedToken.userId;
    console.log(phone);
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // User from send money
    const userAgent = yield user_models_1.default.findById(userId);
    if (!userAgent) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'You are not user agent.');
    }
    // find user agent wallet
    const objectAgentId = new mongoose_1.default.Types.ObjectId(userId);
    const userAgentWallet = yield wallet_models_1.default.findOne({ user: objectAgentId });
    if (!userAgentWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Agent wallet not found.');
    }
    // Check if wallet is blocked or deactivated
    if (userAgentWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || userAgentWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, your agent wallet is ${userAgentWallet.status}`);
    }
    // check if the cash in amount available to agent wallet or not
    if (userAgentWallet.balance < amount) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Insuficient balance in agent wallet.');
    }
    // find the user to cash in
    const userToCashIn = yield user_models_1.default.findOne({ phone });
    if (!userToCashIn) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User not found while cash in.');
    }
    // find user wallet to cash in
    const toUserWallet = yield wallet_models_1.default.findOne({ user: userToCashIn._id });
    if (!toUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User wallet not found while cash in.');
    }
    // Agent can not cash in to his own wallet
    if (userAgentWallet._id === toUserWallet._id) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You can not cash in to your own wallet.');
    }
    // Check if wallet is blocked or deactivated
    if (toUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || toUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${toUserWallet.status}`);
    }
    // Minus balance from current user wallet
    userAgentWallet.balance -= Number(amount);
    yield userAgentWallet.save();
    // Add balance to user wallet
    toUserWallet.balance += Number(amount);
    yield toUserWallet.save();
    // Create transaction
    const transactionPayload = {
        user: objectAgentId,
        type: transaction_interfaces_1.TRANSACTION_TYPES.CASH_IN,
        amount: Number(amount),
        numberFrom: userAgent.phone,
        numberTo: userToCashIn.phone,
        status: transaction_interfaces_1.TRANSACTION_STATUS.COMPLETED,
    };
    const transaction = yield transaction_models_1.default.create(transactionPayload);
    return {
        userAgentWallet,
        toUserWallet,
        transaction
    };
});
// Cash out from any user wallet by an agent only
const cashOut = (payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentPhoneNumber, cashOutAmount } = payload;
    const userId = decodedToken.userId;
    // Get cashout charge in percentage
    const transactionParameter = yield transaction_models_1.TransactionParameter.findOne();
    if (!transactionParameter) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Transacton parameter not found.');
    }
    const cashOutChargeInPercentage = transactionParameter.cashOutCharge;
    const agentCommistionInPercentage = transactionParameter.agentCommision;
    // calculate cash out charge
    const cashOutCharge = Number(cashOutAmount) * (Number(cashOutChargeInPercentage) / 100);
    // Agents commision
    const agentCommision = cashOutCharge * (Number(agentCommistionInPercentage) / 100);
    // Payra pay will get
    const payraPaywillGet = cashOutCharge - agentCommision;
    // agent will get total
    const agentsTotal = Number(cashOutAmount) + agentCommision;
    // Total amount with cashout charge
    const totalAmountWithCashOutCharge = Number(cashOutAmount) + cashOutCharge;
    if (!userId) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not available.');
    }
    // find cash out user
    const cashOutUser = yield user_models_1.default.findById(userId);
    if (!cashOutUser) {
        throw new appError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Cash out user not found.');
    }
    // find cash out user wallet
    const objectAgentId = new mongoose_1.default.Types.ObjectId(userId);
    const cashOutUserWallet = yield wallet_models_1.default.findOne({ user: objectAgentId });
    if (!cashOutUserWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Cash out user wallet not found.');
    }
    // Check if wallet is blocked or deactivated
    if (cashOutUserWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || cashOutUserWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${cashOutUserWallet.status}`);
    }
    // check if the cash out amount actually available to the users wallet or not
    if (cashOutUserWallet.balance < totalAmountWithCashOutCharge) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Insufficient balance to cash out.');
    }
    // find the user agent to cash out
    const userAgent = yield user_models_1.default.findOne({ phone: agentPhoneNumber });
    if (!userAgent) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User agent not found while cash out.');
    }
    // User must be an agent to cash out
    if (userAgent.role !== user_interfaces_1.Role.AGENT) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'User is not an Agent.');
    }
    // find agent wallet to cash out
    const agentWallet = yield wallet_models_1.default.findOne({ user: userAgent._id });
    if (!agentWallet) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'User agent wallet not found while cash out.');
    }
    // Agent can not cash out from his own wallet 
    if (cashOutUserWallet._id === agentWallet._id) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'You can not cash out from your own wallet.');
    }
    // Check if wallet is blocked or deactivated
    if (agentWallet.status === wallet_interfaces_1.WALLET_STATUS.BLOCKED || agentWallet.status === wallet_interfaces_1.WALLET_STATUS.DEACTIVATED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, `Sorry, You cannot perform this operation. Your wallet is ${agentWallet.status}`);
    }
    // Minus balance from current user wallet
    cashOutUserWallet.balance -= Number(totalAmountWithCashOutCharge);
    yield cashOutUserWallet.save();
    // Add balance to user wallet
    agentWallet.balance += Number(agentsTotal);
    yield agentWallet.save();
    // Create transaction
    const transactionPayload = {
        user: objectAgentId,
        agent: userAgent._id,
        type: transaction_interfaces_1.TRANSACTION_TYPES.CASH_OUT,
        amount: cashOutAmount,
        totalAmountWithCharge: totalAmountWithCashOutCharge,
        charge: cashOutCharge,
        agentCommision: agentCommision,
        payraPayGot: payraPaywillGet,
        numberFrom: cashOutUser.phone,
        numberTo: userAgent.phone,
        status: transaction_interfaces_1.TRANSACTION_STATUS.COMPLETED,
    };
    const transaction = yield transaction_models_1.default.create(transactionPayload);
    // Update agent total commision
    const updatedAgentWallet = yield wallet_models_1.default.findOneAndUpdate({ user: userAgent._id }, {
        $inc: { totalCommision: agentCommision }
    }, { new: true, runValidators: true });
    return {
        cashOutUserWallet,
        updatedAgentWallet,
        transaction
    };
});
// crate transactio parameter
const createTransactionParameters = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if transaction parameter already exist
    const transactionParameter = yield transaction_models_1.TransactionParameter.findOne();
    if (transactionParameter) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Transaction parameter already available. You can just update the parameters value now.');
    }
    const createdParameter = yield transaction_models_1.TransactionParameter.create(payload);
    return createdParameter;
});
// Update transaction parameter
const updateTransactionParameter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if transaction parameter already exist
    const transactionParameter = yield transaction_models_1.TransactionParameter.findOne();
    if (!transactionParameter) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, 'Transaction parameter not found.');
    }
    const updatedParameter = yield transaction_models_1.TransactionParameter.findOneAndUpdate({}, payload, { new: true });
    return updatedParameter;
});
exports.TransactionServices = {
    addMoneyToWallet,
    withdrawMoneyFromWallet,
    sendMoneyToAnotherWallet,
    getAllTransactionHistory,
    cashIn,
    cashOut,
    getAllTransactions,
    createTransactionParameters,
    updateTransactionParameter
};
