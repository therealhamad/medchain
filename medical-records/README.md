# MedChain: A Blockchain-Based Medical Records System
## Overview 
MedChain is a revolutionary platform leveraging blockchain technology to manage and secure medical records. It empowers patients to control their medical data, enabling them to create, edit, and store records on-chain while allowing doctors access through a secure and transparent system.

## Features
- Decentralized Storage: Medical records are stored on a blockchain, ensuring data integrity and availability.
- Patient Control: Patients have full control over their medical data, deciding who can access their records.
- Secure Access: Doctors can access patient records through smart contracts, ensuring only authorized access.
- Immutable Records: Once added, records cannot be altered or deleted, providing a reliable history.
- Transparency: All access and modifications are logged on the blockchain, providing a transparent audit trail.

## Technical Details

Smart Contracts
MedChain uses smart contracts written in Solidity to manage medical records. The smart contracts handle the following functionalities:

- Record Creation: Patients can create new medical records.
- Record Editing: Patients can update existing medical records.
- Access Control: Patients can grant or revoke access to their medical records for doctors.
- Tools and Technologies
- Blockchain Platform: Ethereum
- Development Framework: Hardhat
- Programming Language: Solidity
- Library: Ethers.js
- API Service: Alchemy

## Usage with Polygon Cardano zkEVM
To leverage the Polygon Cardano zkEVM in MedChain, follow these steps:

## Prerequisites
- Install Node.js and npm.
- Set up Hardhat and other dependencies as per the initial setup.
## Setting Up Polygon Cardano zkEVM
1. Install Polygon Cardano zkEVM Plugin:

```sh
npm install @polygon/cardano-zkevm
```
2. Configure Hardhat for Polygon Cardano zkEVM:
Update your hardhat.config.js to include the network configuration for Polygon Cardano zkEVM.

```javascript
require("@nomiclabs/hardhat-waffle");
require("@polygon/cardano-zkevm");

module.exports = {
  defaultNetwork: "polygonCardano",
  networks: {
    polygonCardano: {
      url: "https://polygon-cardano-zkevm.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY",
      accounts: ["0xYOUR_PRIVATE_KEY"]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
```
3. Deploy Smart Contracts on Polygon Cardano zkEVM:
Ensure your deployment scripts target the polygonCardano network.

```sh
npx hardhat run scripts/deploy.js --network polygonCardano
```
4. Update Frontend to Interact with Polygon Cardano zkEVM:
Modify your Ethers.js setup to connect to the Polygon Cardano zkEVM network.

```javascript
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://polygon-cardano-zkevm.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY");
```

By integrating Polygon Cardano zkEVM, MedChain can benefit from enhanced scalability, lower transaction costs, and improved privacy for medical record management.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
