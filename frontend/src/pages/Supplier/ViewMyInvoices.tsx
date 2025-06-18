import { useEffect } from "react";
import { useWalletStore } from "../../store/walletStore";
import { useViewInvoiceStore } from "../../store/viewInvoicesStore";

export default function ViewMyInvoices() {
  const { signer } = useWalletStore();
  const URL = "https://gateway.pinata.cloud/ipfs/";

  const { data, fetchInvoices } = useViewInvoiceStore();

  useEffect(() => {
    // Fetch from blockchain
    const fetch = async () => {
      await fetchInvoices();
    };

    fetch();
  }, [signer, fetchInvoices]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 My Invoices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((invoice, index) => (
          <div key={index} className="bg-white p-4 rounded shadow border">
            <h2 className="text-lg font-semibold">{invoice.invoiceTitle}</h2>
            <p className="text-sm text-gray-600">{invoice.desc}</p>
            <p className="mt-1 font-medium">${invoice.amount.toString()}</p>
            <a
              href={URL + invoice.ipfsPDFHash}
              target="_blank"
              className="text-blue-600 underline mt-2 inline-block"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
