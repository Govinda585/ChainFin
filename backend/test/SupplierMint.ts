import { ethers } from "hardhat";
import { expect } from "chai";
import { SupplierMint } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SupplierMint", () => {
  let supplierMint: SupplierMint;
  let signer: SignerWithAddress;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("SupplierMint");
    supplierMint = (await Contract.deploy()) as SupplierMint;
    [signer] = await ethers.getSigners();
    await supplierMint.waitForDeployment();
  });

  it("should check initial value of tokenCounter", async () => {
    expect(await supplierMint.tokenCounter()).to.equal(0);
  });

  it("should mint NFT", async () => {
    await supplierMint.mintNFT("ipfs://example-uri");
    expect(await supplierMint.tokenCounter()).to.equal(1);
  });

  it("should revert if tokenURI is empty", async () => {
    await expect(supplierMint.mintNFT("")).to.be.revertedWith(
      "Token URI cannot be empty"
    );
  });

  it("should emit NFTMinted event", async () => {
    await expect(supplierMint.mintNFT("ipfs://example-uri"))
      .to.emit(supplierMint, "NFTMinted")
      .withArgs(signer.address, 0, "ipfs://example-uri");
  });
});
