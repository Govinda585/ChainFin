import { useWalletStore } from "../store/walletStore";
import { contractInstance } from "../utils/contractInstance";

export const fetchInvoiceMetadata = async () => {
  const signer = useWalletStore.getState().signer;
  if (!signer) throw new Error("Signer not available");

  const contract = contractInstance(signer);

  const count = await contract.getInvoiceCount();
  const invoiceCount = Number(count);

  if (invoiceCount === 0) {
    return { invoice: null, invoices: [] };
  }

  // Get the latest invoice tuple
  const latestInvoiceTuple = await contract.getInvoice(invoiceCount - 1);

  // Fetch all invoices in parallel as tuples
  const invoicePromises = Array.from({ length: invoiceCount }, (_, i) =>
    contract.getInvoice(i)
  );

  const rawInvoices = await Promise.all(invoicePromises);

  // Map tuples to invoice objects
  const invoices = rawInvoices.map((inv) => ({
    invoiceTitle: inv[0],
    desc: inv[1],
    amount: Number(inv[2]),
    ipfsPDFHash: inv[3],
  }));

  // Map latest invoice tuple to object
  const invoice = {
    invoiceTitle: latestInvoiceTuple[0],
    desc: latestInvoiceTuple[1],
    amount: Number(latestInvoiceTuple[2]),
    ipfsPDFHash: latestInvoiceTuple[3],
  };

  return { invoice, invoices };
};
