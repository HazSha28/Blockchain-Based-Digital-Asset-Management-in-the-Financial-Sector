# Blockchain-Based Digital Asset Management

A blockchain-based digital asset management system built using Solidity and Hardhat. It enables asset tokenization, KYC verification, secure transfers, asset freezing, balance tracking, and transparent auditing through smart contracts.

## Project Overview

Traditional financial institutions often face challenges such as fragmented ledgers, slow settlements, high intermediary costs, and limited transaction transparency. This project demonstrates how blockchain technology can improve the security, traceability, and efficiency of financial asset management.

## Features

- **Asset Tokenization:** Register financial assets such as bonds and equities.
- **KYC Verification:** Restrict asset issuance and transfers to approved users.
- **Secure Transfers:** Transfer asset units between eligible investors.
- **Asset Freezing:** Allow administrators to freeze or unfreeze assets.
- **Balance Tracking:** Check the units held by each wallet.
- **Audit Trail:** Record transactions using blockchain events.
- **Document Integrity:** Store document hashes on-chain for integrity verification.

## Technology Stack

- Solidity
- Hardhat
- JavaScript
- Ethers.js
- Chai
- Ethereum-compatible blockchain

## System Workflow

1. The administrator approves users through KYC verification.
2. The issuer registers an asset with its details and document hash.
3. The smart contract assigns the asset units to the issuer.
4. Approved users transfer asset units securely.
5. The contract validates KYC status, asset status, and available balance.
6. Blockchain events record successful operations.
7. Administrators can freeze assets when required.

## Smart Contract Functions

| Function | Description |
|---|---|
| `setKYC()` | Approves or revokes user KYC status |
| `issueAsset()` | Registers and tokenizes a financial asset |
| `transferAsset()` | Transfers asset units between approved wallets |
| `freezeAsset()` | Freezes or unfreezes an asset |
| `balanceOf()` | Returns the balance of a wallet |
| `kycApproved()` | Checks a wallet's KYC approval status |

## Installation and Execution

### Prerequisites
Install Node.js and npm.

### Install dependencies
```bash
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

Choose a JavaScript project when prompted.

### Compile the smart contract
```bash
npx hardhat compile
```

### Run tests
```bash
npx hardhat test
```

### Deploy locally
Start a local blockchain in the first terminal:
```bash
npx hardhat node
```

Deploy using a second terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Record the actual contract address and transaction hash printed by your deployment.

## Security Considerations

- Personal KYC documents should be stored off-chain.
- Only authorized administrators should manage KYC approvals and asset freezing.
- Transfers must satisfy KYC, balance, and asset-status checks.
- Document hashes help detect document changes.
- Production use requires security audits, privacy controls, and regulatory review.

## Limitations

- Public blockchain transaction fees and scalability may affect performance.
- Financial regulations vary across jurisdictions.
- Integration with traditional banking systems can be complex.
- The prototype does not itself execute fiat payments or establish legal ownership.

## Future Enhancements

- Web application integrated with MetaMask.
- Investor dashboard for viewing asset balances.
- Off-chain document storage integration.
- Transaction history and analytics dashboard.
- Deployment and verification on an Ethereum test network.

## Author

**Ayishathul Hazeena S**

Academic project: Blockchain-Based Digital Asset Management in the Financial Sector.

## Disclaimer

This project is intended for educational and demonstration purposes. Do not use it to manage real financial assets without appropriate legal review, security audits, and production-grade controls.
