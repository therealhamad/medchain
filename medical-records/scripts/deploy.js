const { ethers } = require("hardhat");
const { Network, Alchemy } = require('alchemy-sdk');

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);

    const TokenBalanceChecker = await ethers.getContractFactory("MedicalRecords");
    const tokenBalanceChecker = await TokenBalanceChecker.deploy();
  
    console.log(
      "TokenBalanceChecker contract deployed to:",
      tokenBalanceChecker.address
    );

// Initialize Alchemy with your API key and network
const settings = {
  apiKey: "your_polygon_mumbai_api_key", // Replace with your Polygon Mumbai Alchemy API Key
  network: Network.MATIC_MUMBAI, // Adjust the network to Polygon Mumbai Testnet
};
const alchemy = new Alchemy(settings);

// Fetch and log sent transactions from the deployer address
console.log("Fetching sent transactions from the deployer address...");
await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: deployer.address,
  category: ["erc721", "external", "erc20"],
}).then(console.log);

// Print token balances of USDC in Vitalik's address
console.log("Fetching USDC token balance for Vitalik's address...");
const vitalikAddress = "ADDRESS";
const usdcContract = "ADDRESS";
await alchemy.core.getTokenBalances(vitalikAddress, [usdcContract]).then(console.log);

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
