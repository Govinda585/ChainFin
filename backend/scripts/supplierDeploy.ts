import hre from "hardhat";

const main = async () => {
  const Supplier = await hre.ethers.getContractFactory("Supplier");
  const supplier = await Supplier.deploy();
  await supplier.waitForDeployment();
  console.log(`Supplier deployed to: ${supplier.target}`);
};

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
