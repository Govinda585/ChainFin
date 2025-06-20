import hre from "hardhat";

const main = async () => {
  const SupplierMint = await hre.ethers.getContractFactory("SupplierMint");
  const supplierMint = await SupplierMint.deploy();
  await supplierMint.waitForDeployment();
  console.log(`Supplier NFT MINT deployed to: ${supplierMint.target}`);
};

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
