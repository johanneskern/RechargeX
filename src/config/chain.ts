import { ethers, BrowserProvider, Contract } from "ethers";

import { rechargexContractABI } from "./abi";

const chainDetails = {
    id: 80001,
    label: 'Polygon Mumbai',
    asset: 'MATIC',
    scanUrl: 'https://mumbai.polygonscan.com',
    contract: process.env.REACT_APP_RECHARGEX_CONTRACT_ADDRESS || '',
}

export const getRechargexContract = async () => {
    if (!window.ethereum) {
        throw new Error('No crypto wallet found. Please install it.');
    }

    const provider = new BrowserProvider(window.ethereum);

    return new Contract(chainDetails?.contract || '', rechargexContractABI, await provider.getSigner());
}

export const underNetwork = async (chain: any) => {
    if (!chain) {
        throw new Error('No mainchain defined.');
    }

    if (!window.ethereum) {
        throw new Error('No crypto wallet found. Please install it.');
    }

    if (window.ethereum.networkVersion == chain?.id) {
        return
    }

    return await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
            chainId: ethers.toQuantity(chain.id)
        }],
    }).catch((switchError: any) => {
        // networkConfigurationId undefined does not match a configured networkConfiguration
        if (switchError) {
            switch (switchError.code) {
                case -32603:
                    throw {
                        message: `Unable to switch the network. Please, switch to ${chain?.label} network in Metamask.`
                    }
                case -32002:
                    throw {
                        message: `Already processing Metamask.`
                    }
                case 4902:
                    throw {
                        message: `Please, add ${chain?.label} network in Metamask and try again.`
                    }
            }
        }

        throw switchError
    });
};

export const connectAccount = async () => {
    return await underNetwork(chainDetails)
        .then(() => window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }))
        .then(() => window.ethereum.request({
            method: 'eth_requestAccounts'
        }))
        .then((accs) => accs[0])
}