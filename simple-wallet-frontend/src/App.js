import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleWalletABI from "./SimpleWalletABI.json";

function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [walletContract, setWalletContract] = useState(null);
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const code = await signer.provider.getCode(CONTRACT_ADDRESS);
    console.log("Contract code:", code)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, SimpleWalletABI.abi, signer);
    setWalletContract(contract);
    console.log(contract);
  };

  useEffect(() => {
    const getNetwork = async () => {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      let networkName;
      switch (network.chainId) {
        case 1:
          networkName = "mainnet";
          break;
        case 3:
          networkName = "ropsten";
          break;
        case 4:
          networkName = "rinkeby";
          break;
        case 5:
          networkName = "goerli";
          break;
        case 42:
          networkName = "kovan";
          break;
        case 31337:
          networkName = "hardhat";
          break;
        default:
          networkName = "unknown";
      }

      setNetwork(networkName);
    };

    getNetwork();
  }, [account]);

  const getBalance = async () => {
    if (!walletContract) return;

    try {
      const bal = await walletContract.getBalance();
      setBalance(ethers.formatEther(bal));
    } catch (err) {
      console.error(err);
    }
  };

  const deposit = async () => {
    if (!walletContract) return;

    try {
      const tx = await walletContract.deposit({
        value: ethers.parseEther("1"),
      });

      await tx.wait();
      alert("Deposit successful");
    } catch (err) {
      console.error(err);
    }
  };

  const withdraw = async () => {
    if (!walletContract) return;

    try {
      const tx = await walletContract.withdraw(
        ethers.parseEther("0.5")
      );

      await tx.wait();
      alert("Withdraw successful");
    } catch (err) {
      console.error(err);
      alert("Withdraw failed. Are you the owner?");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Simple Wallet</h1>
    
      {account ? (
        <>
          <p>Connected: {account}</p>
          {network && <p>Network: {network}</p>}
          <button onClick={getBalance}> Get Wallet Balance </button>
          {balance && <p> Wallet Balance: {balance}</p>}
          <button onClick={deposit}>Deposit 1 ETH</button>
          <button onClick={withdraw}>Withdraw 0.5 ETH</button>
        </>
      ) : (
        <>
        <button onClick={connectWallet}>Connect MetaMask</button>
        </>
      )}
    </div>
  );
}

export default App;