import { ethers } from "hardhat";
import { expect } from "chai";
import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Supplier } from "../typechain-types";

describe("Supplier", () => {
  let supplier: Supplier;
  let signer: SignerWithAddress;
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory("Supplier");
    [signer] = await ethers.getSigners();
    supplier = (await Contract.deploy()) as Supplier;
    await supplier.waitForDeployment();
  });

  it("should initialize length of invoices to 0", async () => {
    expect(await supplier.getInvoiceCount()).to.equal(0);
  });

  it("should set invoices", async () => {
    await supplier.setInvoice("steel", "150 tons", 5500, "ipfshash");
    expect(await supplier.getInvoiceCount()).to.equal(1);
  });

  it("should emit InvoiceCreated event", async () => {
    await expect(supplier.setInvoice("nvidia", "gpu", 32, "ipfs"))
      .to.emit(supplier, "InvoiceCreated")
      .withArgs(0, "nvidia", signer.address);
  });
});
