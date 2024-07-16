# MedChain: A Blockchain-Based Medical Records System#
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

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
