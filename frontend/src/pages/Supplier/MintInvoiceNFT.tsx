import { useEffect, useRef } from "react";
import { FadeLoader } from "react-spinners";

import { useMintInvoiceStore } from "../../store/mintInvoiceStore";
import { useWalletStore } from "../../store/walletStore";

export default function MintInvoiceNFT() {
  const { fetchInvoice, loading, data } = useMintInvoiceStore();
  const hasFetchedRef = useRef(false);
  const { signer } = useWalletStore();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!hasFetchedRef.current && (!data || data.length === 0)) {
          await fetchInvoice();
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    }
    fetchData();
  }, [data, fetchInvoice, signer]);

  const handleMint = async () => {
    // minting logic goes here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <FadeLoader color="blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Mint Invoice NFT</h1>
      <p className="mb-4">Send uploaded invoice to the blockchain as an NFT.</p>

      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Invoice Metadata
        </h2>

        {data && data.length > 0 ? (
          data
            .filter((inv) => inv.invoiceTitle && inv.desc)
            .map((invoice, index) => (
              <ul
                key={index}
                className="mb-6 text-base text-gray-700 space-y-2"
              >
                <li>
                  <strong className="text-gray-800">Title:</strong>{" "}
                  {invoice.invoiceTitle}
                </li>
                <li>
                  <strong className="text-gray-800">Description:</strong>{" "}
                  {invoice.desc}
                </li>
                <li>
                  <strong className="text-gray-800">Amount:</strong> $
                  {String(invoice.amount)}
                </li>
                <li>
                  <strong className="text-gray-800">File Hash:</strong>{" "}
                  <span className="break-words">{invoice.ipfsPDFHash}</span>
                </li>
              </ul>
            ))
        ) : (
          <p className="text-gray-500">No invoice metadata found.</p>
        )}

        <button
          onClick={handleMint}
          className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
        >
          Mint Invoice NFT
        </button>
      </div>
    </div>
  );
}
