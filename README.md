# Mission 5 — Simple Wallet dApp

A full-stack Ethereum dApp built with **Solidity**, **Hardhat**, **React**, and **ethers.js**.

This project demonstrates:
- Smart contract development
- Local blockchain deployment with Hardhat
- React frontend integration
- MetaMask wallet connection
- Read/write contract interactions
- Owner-only access control

---

## 🧱 Smart Contract

**SimpleWallet.sol** features:

- Accept ETH deposits
- Track contract balance
- Owner-only withdrawals
- Revert on unauthorized access

### Core Functions
- `deposit()` — payable ETH deposit
- `getBalance()` — returns contract balance
- `withdraw(uint256 amount)` — owner-only withdrawal

---

## 🖥️ Frontend (React)

The React app allows users to:

- Connect MetaMask
- Detect active network
- View connected address
- Deposit ETH into the wallet
- Read wallet balance
- Withdraw ETH (owner only)

Built with:
- React
- ethers.js
- MetaMask

---

## 🧪 Local Development

### Prerequisites
- Node.js
- MetaMask

### Run locally

```bash
# 1. Start local Hardhat network
npx hardhat node

# 2. Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# 3. Start frontend
cd simple-wallet-frontend
npm install
npm start
