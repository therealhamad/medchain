require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`]
    },
    cardona: {
      url: "https://polygon-cardona-rpc-url",
      chainId: YOUR_CHAIN_ID, // Replace with the actual chain ID
      accounts: [`0x${YOUR_PRIVATE_KEY}`]
  },
}
}
