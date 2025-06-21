import { create } from "zustand";
import { fetchInvoiceMetadata } from "../api/InvoiceNFTMetadata";

// Define a single invoice structure
type Invoice = {
  invoiceTitle: string;
  desc: string;
  amount: bigint;
  ipfsPDFHash: string;
};

interface ViewInvoiceStore {
  data: Invoice[];
  loading: boolean;
  fetchInvoices: () => Promise<void>;
}

export const useViewInvoiceStore = create<ViewInvoiceStore>((set) => ({
  data: [],
  loading: false,
  fetchInvoices: async () => {
    set({ loading: true });
    try {
      const { invoices } = await fetchInvoiceMetadata();
      console.log("Raw invoices:", invoices);

      const formatted = invoices.map((invoice: any) => ({
        invoiceTitle: invoice.invoiceTitle,
        desc: invoice.desc,
        amount: invoice.amount,
        ipfsPDFHash: invoice.ipfsPDFHash,
      }));

      set({ data: formatted, loading: false });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      set({ data: [], loading: false });
    }
  },
}));
