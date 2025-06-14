import { useWalletStore } from "../store/walletStore";
import { contractInstance } from "../utils/contractInstance";

export const fetchInvoiceMetadata = async () => {
  const signer = useWalletStore.getState().signer;

  if (!signer) throw new Error("Signer not available");

  const contract = contractInstance(signer);

  const latestInvoiceCount = await contract.getInvoiceCount();
  const latestIndex = latestInvoiceCount - BigInt(1);

  const invoice = await contract.invoices(latestIndex);

  const invoices = [];
  // 0n represent BigInt not regular number like 0
  for (let i = 0n; i < latestInvoiceCount; i++) {
    const inv = await contract.invoices(i);
    invoices.push(inv);
  }

  return { invoice, invoices };
};
