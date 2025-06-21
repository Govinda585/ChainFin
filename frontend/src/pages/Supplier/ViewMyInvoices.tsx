import { useEffect } from "react";
import { useWalletStore } from "../../store/walletStore";
import { useViewInvoiceStore } from "../../store/viewInvoicesStore";

export default function ViewMyInvoices() {
  const { signer } = useWalletStore();
  const { data, fetchInvoices, loading } = useViewInvoiceStore();

  const URL = "https://gateway.pinata.cloud/ipfs/";

  useEffect(() => {
    if (signer) {
      fetchInvoices();
    }
  }, [signer]);

  if (!signer) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        Please connect your wallet to view invoices.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p className="text-lg">Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        📄 My Invoices
      </h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...data].reverse().map((invoice, index) => (
            <div
              key={invoice.ipfsPDFHash || index}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Invoice #{index + 1}
              </h2>

              <div className="space-y-3 flex-grow">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Title:</span>
                  <span className="text-gray-900">
                    {invoice.invoiceTitle || "Untitled"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Description:</span>
                  <span className="text-gray-900">
                    {invoice.desc || "No description"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Amount:</span>
                  <span className="text-gray-900">
                    {invoice.amount !== undefined && invoice.amount !== null
                      ? `$${invoice.amount.toString()}`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 break-all">
                  <span className="font-medium">File Hash:</span>
                  <span className="text-gray-900">
                    {invoice.ipfsPDFHash || "-"}
                  </span>
                </div>
              </div>

              <a
                href={URL + invoice.ipfsPDFHash}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg mt-16">
          No invoices found.
        </p>
      )}
    </div>
  );
}
