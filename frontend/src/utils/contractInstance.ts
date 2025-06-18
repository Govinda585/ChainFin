import { ethers } from "ethers";
import ContractABI from "../../../backend/artifacts/contracts/Supplier.sol/Supplier.json";
import ContractABIMINT from "../../../backend/artifacts/contracts/SupplierMint.sol/SupplierMint.json";

import type { Signer } from "ethers";

const CONTRACT_ADDRESS = import.meta.env
  .VITE_SUPPLIER_CONTRACT_ADDRESS as string;

const CONTRACT_ADDRESS_NFT = import.meta.env
  .VITE_SUPPLIER_NFT_CONTRACT_ADDRESS as string;

const ABI_SUPPLIER = ContractABI.abi;
const ABI_MINT = ContractABIMINT.abi;

export const contractInstance = (signer: Signer | null) => {
  if (!CONTRACT_ADDRESS) throw new Error("Contract address is not defined");
  if (!signer) throw new Error("Signer is not available");

  return new ethers.Contract(CONTRACT_ADDRESS, ABI_SUPPLIER, signer);
};

export const contractInstanceNFT = (signer: Signer | null) => {
  if (!CONTRACT_ADDRESS_NFT) throw new Error("Contract address is not defined");
  if (!signer) throw new Error("Signer is not available");

  return new ethers.Contract(CONTRACT_ADDRESS_NFT, ABI_MINT, signer);
};
