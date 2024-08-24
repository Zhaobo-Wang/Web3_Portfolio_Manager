import React, { useState } from 'react';
import './App.css'; 
import WalletConnect from './WalletConnect';
import BalanceDisplay from './BalanceDisplay';
import TransactionComponent from './TransactionComponent';

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="container">
      <h1>Web3 Portfolio Manager</h1>
      <div className="wallet-connect">
        <WalletConnect onAccountChange={setAccount} />
      </div>
      {account && (
        <div className="balances">
          <BalanceDisplay account={account} />
        </div>
      )}
      {account && (
        <div className="transaction">
          <TransactionComponent account={account} />
        </div>
      )}
    </div>
  );
}

export default App;
