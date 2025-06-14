import { ethers } from "ethers";
import ContractABI from "../../../backend/artifacts/contracts/Supplier.sol/Supplier.json";
import type { Signer } from "ethers";

const CONTRACT_ADDRESS = import.meta.env
  .VITE_SUPPLIER_CONTRACT_ADDRESS as string;

const ABI = ContractABI.abi;

export const contractInstance = (signer: Signer | null) => {
  if (!CONTRACT_ADDRESS) throw new Error("Contract address is not defined");
  if (!signer) throw new Error("Signer is not available");

  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};
