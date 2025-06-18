import { useEffect, useRef } from "react";
import { FadeLoader } from "react-spinners";

import { useMintInvoiceStore } from "../../store/mintInvoiceStore";
import { useWalletStore } from "../../store/walletStore";
import { contractInstanceNFT } from "../../utils/contractInstance";
import { PostMetadataJSON } from "../../api/pinataAPI";

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
  }, [data, fetchInvoice]);

  const handleMint = async () => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        alert("No invoice data to mint");
        return;
      }

      // Assuming you want to mint the first invoice in the array
      const invoice = data[0];

      if (
        !invoice.invoiceTitle ||
        !invoice.desc ||
        !invoice.amount ||
        !invoice.ipfsPDFHash
      ) {
        alert("Incomplete invoice fields");
        return;
      }

      // Prepare metadata object
      const metadata = {
        name: invoice.invoiceTitle,
        description: invoice.desc,
        amount: invoice.amount.toString(),
        fileHash: invoice.ipfsPDFHash,
        file_url: `https://gateway.pinata.cloud/ipfs/${invoice.ipfsPDFHash}`,
      };

      // Upload metadata JSON to IPFS
      const metadataCID = await PostMetadataJSON(metadata);
      const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataCID}`;

      // Mint NFT with metadata URI
      const contract = contractInstanceNFT(signer);
      const tx = await contract.MintNFT(metadataURI);
      await tx.wait();

      console.log("✅ NFT Minted successfully!");
      console.log("📎 Metadata URI:", metadataURI);
      alert("NFT minted successfully!");
    } catch (err) {
      console.error("❌ Minting failed:", err);
      alert("NFT minting failed. Check console for details.");
    }
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

      {/* PDF preview of first invoice */}
      {data && data.length > 0 && data[0].ipfsPDFHash && (
        <div className="mt-4 max-w-xl w-full">
          <h2 className="text-xl font-semibold mb-2">📄 Invoice Preview</h2>
          <iframe
            src={`https://gateway.pinata.cloud/ipfs/${data[0].ipfsPDFHash}`}
            width="100%"
            height="600px"
            title="Invoice PDF"
            className="rounded shadow border"
          />
        </div>
      )}
    </div>
  );
}
