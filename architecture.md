# Architecture and Data Flow

## Actors
- **Admin / Regulator:** approves or revokes KYC and freezes assets.
- **Issuer:** registers assets and receives the initial units.
- **Investor:** holds and receives asset units.
- **Custodian / Auditor:** inspects balances and emitted events.

## Layers
1. **Client and wallet:** web application, Web3 provider, and wallet signing.
2. **Smart contract:** KYC whitelist, asset issuance, transfer checks, freezing, and events.
3. **Blockchain network:** shared ledger and transaction/event history.
4. **Off-chain storage:** legal documents, prospectuses, valuation reports, and personal KYC files. Store only a document hash on-chain.

## Transfer validation
A transfer must come from a KYC-approved sender, target a KYC-approved recipient, reference a valid asset, use an unfrozen asset, and not exceed the sender's balance. Successful transfers update both balances and emit `AssetTransferred`.

## Important scope note
This is a demonstration model. It does not itself implement fiat payments, legal ownership registration, external price feeds, or a full production compliance process.
