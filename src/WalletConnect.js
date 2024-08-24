import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function WalletConnect({ onAccountChange }) {
    const [account, setAccount] = useState(null);
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install it');
            return;
        }

        setAccount(null);
        onAccountChange(null);

        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask is installed and recognized!');
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                setAccount(accounts[0]);
                onAccountChange(accounts[0]);
                setConnected(true);
            } catch (err) {
                if (err.code === 4001) {
                    console.log("User rejected the request.");
                    alert("You have rejected the connection request. Please try again.");
                } else {
                    console.error("Error connecting to wallet:", err);
                    alert("An unexpected error occurred. Please try again later.");
                }
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    return (
        <div>
            {!connected && (
                <button onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
            {account && (
                <p className="connected-account">
                    Connected Account: <span>{account}</span>
                </p>
            )}
        </div>
    );
}

export default WalletConnect;
