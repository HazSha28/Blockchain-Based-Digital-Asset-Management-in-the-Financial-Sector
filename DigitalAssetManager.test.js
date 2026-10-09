const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DigitalAssetManager", function () {
  let contract, admin, issuer, investor, stranger;
  const docHash = ethers.keccak256(
    ethers.toUtf8Bytes("bond-prospectus.pdf")
  );

  beforeEach(async function () {
    [admin, issuer, investor, stranger] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("DigitalAssetManager");
    contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract.setKYC(issuer.address, true);
    await contract.setKYC(investor.address, true);
  });

  it("TC1: admin can approve KYC", async function () {
    expect(await contract.kycApproved(issuer.address)).to.equal(true);
  });

  it("TC2: non-KYC user cannot issue asset", async function () {
    await expect(
      contract.connect(stranger).issueAsset("Bond", "Bond", docHash, 1000)
    ).to.be.revertedWith("KYC not approved");
  });

  it("TC3: KYC issuer can tokenize an asset", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 1000
    );
    expect(await contract.balanceOf(1, issuer.address)).to.equal(1000);
  });

  it("TC4: transfer between KYC users succeeds", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 1000
    );
    await contract.connect(issuer).transferAsset(1, investor.address, 250);

    expect(await contract.balanceOf(1, investor.address)).to.equal(250);
    expect(await contract.balanceOf(1, issuer.address)).to.equal(750);
  });

  it("TC5: transfer to non-KYC user fails", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 1000
    );
    await expect(
      contract.connect(issuer).transferAsset(1, stranger.address, 10)
    ).to.be.revertedWith("KYC not approved");
  });

  it("TC6: transfer more than balance fails", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 100
    );
    await expect(
      contract.connect(issuer).transferAsset(1, investor.address, 500)
    ).to.be.revertedWith("Insufficient balance");
  });

  it("TC7: frozen asset cannot be transferred", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 100
    );
    await contract.freezeAsset(1, true);
    await expect(
      contract.connect(issuer).transferAsset(1, investor.address, 10)
    ).to.be.revertedWith("Asset frozen");
  });

  it("TC8: only admin can freeze", async function () {
    await contract.connect(issuer).issueAsset(
      "Govt Bond 2030", "Bond", docHash, 100
    );
    await expect(
      contract.connect(investor).freezeAsset(1, true)
    ).to.be.revertedWith("Only admin");
  });
});
