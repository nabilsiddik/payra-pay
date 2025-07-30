import Wallet from "./wallet.models";

// get all wallets
const getAllWallets = async () => {
    const wallets = await Wallet.find()
    return wallets
}

export const WalletServices = {
    getAllWallets
}