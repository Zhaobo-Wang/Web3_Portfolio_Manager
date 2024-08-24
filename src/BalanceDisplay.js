// BalanceDisplay.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const usdcContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

function BalanceDisplay({ account }) {
    const [ethBalance, setEthBalance] = useState(null);
    const [usdcBalance, setUsdcBalance] = useState(null);
    const [usdtBalance, setUsdtBalance] = useState(null);

    useEffect(() => {
        const fetchBalances = async () => {
            if (account) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);

                    const ethBalance = await provider.getBalance(account);
                    setEthBalance(ethers.formatEther(ethBalance));

                    const usdcContract = new ethers.Contract(ethers.getAddress(usdcContractAddress), erc20Abi, provider);
                    const usdcBalance = await usdcContract.balanceOf(account);
                    setUsdcBalance(ethers.formatUnits(usdcBalance, 6));

                    const usdtContract = new ethers.Contract(ethers.getAddress(usdtContractAddress), erc20Abi, provider);
                    const usdtBalance = await usdtContract.balanceOf(account);
                    setUsdtBalance(ethers.formatUnits(usdtBalance, 6));
                } catch (err) {
                    console.error("Error fetching balances:", err);
                }
            }
        };

        fetchBalances();
    }, [account]);

    return (
        <div>
            <h2>Account Balances</h2>
            <div>
                <p>ETH Balance: {ethBalance} ETH</p>
                <p>USDC Balance: {usdcBalance} USDC</p>
                <p>USDT Balance: {usdtBalance} USDT</p>
            </div>
        </div>
    );
}

export default BalanceDisplay;
