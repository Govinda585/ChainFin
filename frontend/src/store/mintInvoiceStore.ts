import { create } from "zustand";
import { fetchInvoiceMetadata } from "../api/InvoiceNFTMetadata";

type Invoice = {
  invoiceTitle: string;
  desc: string;
  amount: number | string;
  ipfsPDFHash: string;
};
interface InvoiceStore {
  data: Invoice[] | null;
  loading: boolean;
  fetchInvoice: () => Promise<void>;
}

export const useMintInvoiceStore = create<InvoiceStore>((set) => ({
  data: null,
  loading: false,
  fetchInvoice: async () => {
    set({ loading: true });
    try {
      const response = await fetchInvoiceMetadata();
      console.log("Fetched invoice data:", response);
      const invoices = response.invoices;
      if (Array.isArray(invoices) && invoices.length > 0) {
        const latestInvoice = invoices[invoices.length - 1];
        set({ data: [latestInvoice], loading: false });
      } else {
        set({ data: [], loading: false });
        console.warn("Invoice data is not an array or is empty!");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      set({ data: [], loading: false });
    }
  },
}));
