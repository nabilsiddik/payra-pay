import { IWallet } from "./wallet.interfaces";

// Business logics of add money to wallet
const addMoneyToWallet = (payload: Partial<IWallet>) => {
    const {balance} = payload
    
}

export const WalletServices = {
    addMoneyToWallet
}