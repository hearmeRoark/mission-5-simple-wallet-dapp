const hre = require("hardhat");

async function main() {
  const SimpleWallet = await hre.ethers.getContractFactory("SimpleWallet");
  const wallet = await SimpleWallet.deploy();

  await wallet.waitForDeployment();

  console.log("SimpleWallet deployed to:", await wallet.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});