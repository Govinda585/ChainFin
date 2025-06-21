import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

import { useMintInvoiceStore } from "../../store/mintInvoiceStore";
import { useWalletStore } from "../../store/walletStore";
import { contractInstanceNFT } from "../../utils/contractInstance";
import { PostMetadataJSON } from "../../api/pinataAPI";

export default function MintInvoiceNFT() {
  const { fetchInvoice, loading, data, hasFetched } = useMintInvoiceStore();
  const { signer } = useWalletStore();

  const [minting, setMinting] = useState(false);

  const latestInvoice = data && data.length > 0 ? data[data.length - 1] : null;

  useEffect(() => {
    if (signer && !hasFetched) {
      fetchInvoice().catch((error) =>
        console.error("Failed to fetch invoices:", error)
      );
    }
  }, [signer, hasFetched, fetchInvoice]);

  const handleMint = async () => {
    if (!signer) {
      alert("Wallet not connected");
      return;
    }

    if (!latestInvoice) {
      alert("No invoice data available");
      return;
    }

    const { invoiceTitle, desc, amount, ipfsPDFHash } = latestInvoice;

    if (!invoiceTitle || !desc || !amount || !ipfsPDFHash) {
      alert("Invoice is missing required fields");
      return;
    }

    try {
      setMinting(true);

      const metadata = {
        name: invoiceTitle,
        description: desc,
        amount: amount.toString(),
        fileHash: ipfsPDFHash,
        file_url: `https://gateway.pinata.cloud/ipfs/${ipfsPDFHash}`,
      };

      const metadataCID = await PostMetadataJSON(metadata);
      const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataCID}`;

      const contract = contractInstanceNFT(signer);
      const tx = await contract.mintNFT(metadataURI);
      await tx.wait();

      console.log("NFT Minted:", metadataURI);
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. Check console for details.");
    } finally {
      setMinting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <FadeLoader color="blue" />
      </div>
    );
  }

  if (!signer) {
    return (
      <div className="text-center p-8 text-red-500 font-medium">
        Please connect your wallet to view invoice data.
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

        {latestInvoice && latestInvoice.invoiceTitle && latestInvoice.desc ? (
          <ul className="mb-6 text-base text-gray-700 space-y-2">
            <li>
              <strong className="text-gray-800">Title:</strong>{" "}
              {latestInvoice.invoiceTitle}
            </li>
            <li>
              <strong className="text-gray-800">Description:</strong>{" "}
              {latestInvoice.desc}
            </li>
            <li>
              <strong className="text-gray-800">Amount:</strong> $
              {String(latestInvoice.amount)}
            </li>
            <li>
              <strong className="text-gray-800">File Hash:</strong>{" "}
              <span className="break-words">{latestInvoice.ipfsPDFHash}</span>
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">No valid invoice metadata found.</p>
        )}

        <button
          onClick={handleMint}
          disabled={minting}
          className={`${
            minting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200`}
        >
          {minting ? "Minting..." : "Mint Invoice NFT"}
        </button>
      </div>

      {/* PDF Preview */}
      {latestInvoice && latestInvoice.ipfsPDFHash && (
        <div className="mt-6 max-w-xl w-full">
          <h2 className="text-xl font-semibold mb-2">📄 Invoice Preview</h2>
          <iframe
            src={`https://gateway.pinata.cloud/ipfs/${latestInvoice.ipfsPDFHash}`}
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
