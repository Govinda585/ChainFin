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
      console.log(invoices);
      const formatted = invoices.map((invoice: any) => ({
        invoiceTitle: invoice[0],
        desc: invoice[1],
        amount: invoice[2],
        ipfsPDFHash: invoice[3],
      }));
      set({ data: formatted, loading: false });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      set({ data: [], loading: false });
    }
  },
}));
