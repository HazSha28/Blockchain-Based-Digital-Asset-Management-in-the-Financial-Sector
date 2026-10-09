
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.20;

 contract DigitalAssetManager {
     address public admin;
     uint256 public assetCount;

     struct Asset {
         uint256 id;
         string name;
         string assetType;
         bytes32 docHash;
         uint256 totalUnits;
         address issuer;
         bool frozen;
     }

     mapping(uint256 => Asset) public assets;
     mapping(uint256 => mapping(address => uint256)) public balances;
     mapping(address => bool) public kycApproved;

     event KYCUpdated(address indexed user, bool status);

     event AssetIssued(
         uint256 indexed id,
         string name,
         address indexed issuer,
         uint256 units,
         bytes32 docHash
     );

     event AssetTransferred(
         uint256 indexed id,
         address indexed from,
         address indexed to,
         uint256 amount
     );

     event AssetFrozen(uint256 indexed id, bool frozen);

     modifier onlyAdmin() {
         require(msg.sender == admin, "Only admin");
         _;
     }

     modifier onlyKYC(address user) {
         require(kycApproved[user], "KYC not approved");
         _;
     }

     constructor() {
         admin = msg.sender;
         kycApproved[msg.sender] = true;
     }

     function setKYC(
         address user,
         bool status
     ) external onlyAdmin {
         kycApproved[user] = status;
         emit KYCUpdated(user, status);
     }

     function issueAsset(
         string calldata name,
         string calldata assetType,
         bytes32 docHash,
         uint256 units
     ) external onlyKYC(msg.sender) returns (uint256) {
         require(units > 0, "Units must be > 0");

         assetCount++;

         assets[assetCount] = Asset(
             assetCount,
             name,
             assetType,
             docHash,
             units,
             msg.sender,
             false
         );

         balances[assetCount][msg.sender] = units;

         emit AssetIssued(
             assetCount,
             name,
             msg.sender,
             units,
             docHash
         );

         return assetCount;
     }

     function transferAsset(
         uint256 id,
         address to,
         uint256 amount
     ) external onlyKYC(msg.sender) onlyKYC(to) {
         require(
             id > 0 && id <= assetCount,
             "Invalid asset"
         );

         require(!assets[id].frozen, "Asset frozen");

         require(
             balances[id][msg.sender] >= amount,
             "Insufficient balance"
         );

         balances[id][msg.sender] -= amount;
         balances[id][to] += amount;

         emit AssetTransferred(
             id,
             msg.sender,
             to,
             amount
         );
     }

     function freezeAsset(
         uint256 id,
         bool status
     ) external onlyAdmin {
         require(
             id > 0 && id <= assetCount,
             "Invalid asset"
         );

         assets[id].frozen = status;

         emit AssetFrozen(id, status);
     }

     function balanceOf(
         uint256 id,
         address user
     ) external view returns (uint256) {
         return balances[id][user];
     }
 }
