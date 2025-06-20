import { create } from "zustand";
import { fetchInvoiceMetadata } from "../api/InvoiceNFTMetadata";

type Invoice = {
  invoiceTitle: string;
  desc: string;
  amount: number;
  ipfsPDFHash: string;
};
interface InvoiceStore {
  data: Invoice[];
  loading: boolean;
  fetchInvoice: () => Promise<void>;
}

export const useMintInvoiceStore = create<InvoiceStore>((set) => ({
  data: [],
  loading: false,
  fetchInvoice: async () => {
    set({ loading: true });
    try {
      const response = await fetchInvoiceMetadata();
      console.log("Fetched invoice data:", response);
      const invoices = response.invoices;
      if (Array.isArray(invoices) && invoices.length > 0) {
        // Set full array, not just latest
        set({ data: invoices, loading: false });
      } else {
        set({ data: [], loading: false });
        console.warn("No invoice data found.");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      set({ data: [], loading: false });
    }
  },
}));
