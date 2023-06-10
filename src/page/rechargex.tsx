import { ethers, parseEther, hexlify, BrowserProvider } from "ethers";
import { useState, useEffect } from "react";
import cn from "classnames";

import { connectAccount, getRechargexContract } from "../config";
import { encryptData } from "../config/encryption";

import './rechargex.css';

const cutCryptoAddress = (address: string, startLength: number, endLength: number): string => {
    if (!address) return address;

    if (address.length <= startLength + endLength) {
        return address;
    }

    const startPart: string = address.substring(0, startLength);
    const endPart: string = address.substring(address.length - endLength);

    return `${startPart}...${endPart}`;
}

function Rechargex() {
    const [account, setAccount] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [phone, setPhone] = useState<string>('+380')

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (acc: string[]) => setAccount(acc[0]))
        }
    }, []);

    const connectMetamask = async () => setAccount(await connectAccount())

    const disconnectMetamask = async () => {
        await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [
                {
                    eth_accounts: {}
                }
            ]
        });
    }

    const topUp = async () => {
        const rechargexContract = await getRechargexContract()
        console.log("parseEther(amount), encryptData(phone)", parseEther(amount), encryptData(phone))
        const tx = await rechargexContract.recharge(parseEther(amount), encryptData(phone), {
            value: parseEther(amount)
        })
        const receipt = await tx.wait()
        console.log("receipt", receipt)
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet"/>

            <video autoPlay muted loop preload="metadata" id="myVideo">
                <source src="/video/main-compresed_v2.mp4" type="video/mp4"/>
            </video>

            <header>
                <div className="container-lg site-header">
                    <div className="d-flex align-center justify-space-between">
                        <span className="site-name text-black-900">Nerif Rechargex</span>

                        {account.length === 0
                            ? (
                                <span onClick={connectMetamask} className="log-in text-primary-600">Connect Metamask</span>
                            )
                            : (
                            <a href="#" className="log-out text-primary-700 bg-white">
                                <img src="/images/account.svg" alt="account" width="34"/>
                                {/*<span>0x1r... 6HJ9</span>*/}
                                <span>{cutCryptoAddress(account, 4, 4)}</span>
                                <img src="/images/logout.svg" alt="logout" width="12.5" onClick={disconnectMetamask}/>
                            </a>
                            )}
                    </div>
                </div>
            </header>

            <form className="form-connect">
                <div className="form-connect__header">
                    <h2 className="text-center text-black-900">Rechargex</h2>
                    <p className="m-0 from-caption text-center">Top up your phone number with crypto</p>
                </div>

                <div className="form-connect__body">
                    <div>
                        <label className="text-black-900">Specify Amount</label>
                        <input
                            type="number"
                            pattern="[0-9]+"
                            placeholder="0.00"
                            className="d-block large amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-black-900">Select Currency</label>

                        <div className="select large currency">
                            <div className="selected-option">
                                <img src="/images/usdt.svg"/> USDT
                            </div>
                            <div className="options">
                                <div className="option">
                                    <img src="/images/usdt.svg"/> USDT
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-black-900">Phone Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="+380"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="phone"
                                className="d-block phone w-100"
                            />
                            <img src="/images/ua-icon.svg" className="icon-ua-circle"/>
                        </div>
                    </div>
                </div>

                <div className="form-connect__footer">
                    <div className="steps d-flex align-center justify-space-between">
                        {account.length === 0
                        ? (
                            <div className="step d-flex align-center" id="1">
                                <span className="number" data-id="1"></span>
                                <button onClick={connectMetamask} className="connect">Connect Metamask</button>
                            </div>
                        )
                        : (
                            <div className="step d-flex align-center done" id="1">
                                <span className="number" data-id="1"></span>
                                <button className="connect"></button>
                            </div>
                        )}

                        <div className={cn("step d-flex align-center", account.length === 0 ? "disabled" : "")} id="2">
                            <span className="number" data-id="2"></span>
                            <button className="topup" onClick={topUp}>Top Up</button>
                        </div>
                    </div>
                </div>
            </form>

            <footer className="footer">
                <div className="container-lg">
                    <div className="d-flex justify-space-between">
                        <img src="/images/_logo.svg" alt="smart contract automation" width="100"/>
                            <div className="contact_us align-center">
                                <a href="mailto:hello@nerif.network" className="mail">hello@nerif.network</a>
                                <a target="_blank" href="https://github.com/nerifnetwork">
                                    <img src="/images/git.svg" alt="smart contract automation"/>
                                </a>
                                <a target="_blank" href="https://twitter.com/NerifNetwork">
                                    <img src="/images/twitter.svg" alt="smart contract automation"/>
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/company/nerif-network">
                                    <img src="/images/linkedin.svg" alt="smart contract automation"/>
                                </a>
                                <a target="_blank" href="https://nerifnetwork.medium.com/">
                                    <img src="/images/M.svg" alt="smart contract automation"/>
                                </a>
                            </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Rechargex;
