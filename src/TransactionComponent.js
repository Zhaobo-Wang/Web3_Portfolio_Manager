
import React, { useState } from 'react';
import { ethers } from 'ethers';

function TransactionComponent({ account }) {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [asset, setAsset] = useState('ETH'); 
    const [transactionStatus, setTransactionStatus] = useState(null);

    const usdcContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

    const handleTransaction = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            if (asset === 'ETH') {
                const tx = await signer.sendTransaction({
                    to: toAddress,
                    value: ethers.parseEther(amount)
                });
                setTransactionStatus(`Transaction successful with hash: ${tx.hash}`);
            } else {
                const contractAddress = asset === 'USDC' ? usdcContractAddress : usdtContractAddress;
                const contract = new ethers.Contract(ethers.getAddress(contractAddress), [
                    "function transfer(address to, uint amount) returns (bool)"
                ], signer);

                const tx = await contract.transfer(toAddress, ethers.parseUnits(amount, 6)); 
                setTransactionStatus(`Transaction successful with hash: ${tx.hash}`);
            }
        } catch (err) {
            if (err.code === "UNCONFIGURED_NAME") {
                setTransactionStatus("Please check your sending address.");
            } else if (err.info && err.info.error && err.info.error.message) {
                setTransactionStatus(err.info.error.message);
            } else {
                console.error("Transaction failed:", err);
                setTransactionStatus("Transaction failed. Please try again.");
            }
        }
    };


    return (
        <div>
            <h2>Send Transaction</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select value={asset} onChange={(e) => setAsset(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
            </select>
            <button onClick={handleTransaction}>Send</button>
            {transactionStatus && <p>{transactionStatus}</p>}
        </div>
    );
}

export default TransactionComponent;
