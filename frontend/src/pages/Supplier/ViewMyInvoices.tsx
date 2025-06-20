import { useEffect } from "react";
import { useWalletStore } from "../../store/walletStore";
import { useViewInvoiceStore } from "../../store/viewInvoicesStore";

export default function ViewMyInvoices() {
  const { signer } = useWalletStore();
  const URL = "https://gateway.pinata.cloud/ipfs/";
  const { data, fetchInvoices, loading } = useViewInvoiceStore();

  useEffect(() => {
    if (signer) {
      fetchInvoices();
    }
  }, [signer, fetchInvoices]);

  if (!signer) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Please connect your wallet to view invoices.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 My Invoices</h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((invoice, index) => (
            <div
              key={invoice.ipfsPDFHash || index}
              className="bg-white p-4 rounded shadow border"
            >
              <h2 className="text-lg font-semibold">{invoice.invoiceTitle}</h2>
              <p className="text-sm text-gray-600">{invoice.desc}</p>
              <p className="mt-1 font-medium">
                ${invoice.amount?.toString() ?? "N/A"}
              </p>

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
      ) : (
        <p className="text-gray-500">No invoices found.</p>
      )}
    </div>
  );
}
