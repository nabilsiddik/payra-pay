"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auths/auth.routes");
const transaction_routes_1 = require("../modules/transaction/transaction.routes");
const wallet_routes_1 = require("../modules/wallet/wallet.routes");
const agentRequest_routes_1 = require("../modules/agentRequest/agentRequest.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRouter
    },
    {
        path: '/transaction',
        route: transaction_routes_1.transactionRouter
    },
    {
        path: '/wallet',
        route: wallet_routes_1.walletRouter
    },
    {
        path: '/agent-request',
        route: agentRequest_routes_1.agentRequestRouter
    }
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.route));
