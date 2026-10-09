const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("DigitalAssetManager");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  console.log("Contract Address:", await contract.getAddress());
  console.log("Deploy Tx Hash :", contract.deploymentTransaction().hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
