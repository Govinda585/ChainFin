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

  it("should create invoices", async () => {
    await supplier.createInvoice("steel", "150 tons", 5500, "ipfshash");
    expect(await supplier.getInvoiceCount()).to.equal(1);
  });

  it("should revert if title is empty ", async () => {
    await expect(supplier.createInvoice("", "gpu", 33, "ipfs")).to.revertedWith(
      "Invoice title is required"
    );
  });

  it("should revert if description is empty ", async () => {
    await expect(
      supplier.createInvoice("nvidia", "", 33, "ipfs")
    ).to.revertedWith("Description is required");
  });
  it("should revert if amount is equal to zero ", async () => {
    await expect(
      supplier.createInvoice("nvidia", "gpu", 0, "ipfs")
    ).to.revertedWith("Amount must be greater than zero");
  });
  it("should revert if IPFS is empty ", async () => {
    await expect(
      supplier.createInvoice("nvidia", "gpu", 44, "")
    ).to.revertedWith("IPFS hash is required");
  });

  it("should emit InvoiceCreated event", async () => {
    await expect(supplier.createInvoice("nvidia", "gpu", 32, "ipfs"))
      .to.emit(supplier, "InvoiceCreated")
      .withArgs(0, "nvidia", signer.address);
  });
  it("should return the correct invoice details", async () => {
    await supplier.createInvoice("steel", "150 tons", 5500, "ipfs://example");
    const [title, description, amount, ipfs] = await supplier.getInvoice(0);
    expect(title).to.equal("steel");
    expect(description).to.equal("150 tons");
    expect(amount).to.equal(5500);
    expect(ipfs).to.equal("ipfs://example");
  });

  it("should revert if index is out of bounds", async () => {
    await expect(supplier.getInvoice(1)).to.be.revertedWith(
      "Invalid invoice index"
    );
  });
});
