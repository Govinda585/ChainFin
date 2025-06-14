import { FaFileInvoice, FaGavel, FaLayerGroup, FaUpload } from "react-icons/fa";
import Card from "../../components/Card";

const Home = () => {
  return (
    <div className="bg-zinc-100">
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, Supplier
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            A decentralized platform enabling supply chain financing by
            connecting suppliers, buyers, and financiers on the blockchain.
            Tokenize your invoices as NFTs, gain liquidity, and participate in a
            transparent marketplace secured by Ethereum smart contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              cardTitle="Upload Invoice"
              cardDesc="Fill all details of invoice and upload it."
              cardNavigation="/upload-invoice"
              cardIcon={<FaUpload className="text-indigo-600 text-3xl mb-4" />}
            />
            <Card
              cardTitle="Mint Invoice NFT"
              cardDesc="Turn your approved invoice into a digital NFT and offer it to
                financiers."
              cardNavigation="/mint-invoice-nft"
              cardIcon={
                <FaFileInvoice className="text-blue-600 text-3xl mb-4" />
              }
            />
            <Card
              cardTitle="Track Bids"
              cardDesc="View ongoing bids placed by financiers on your tokenized
                invoices."
              cardNavigation="/track-bids"
              cardIcon={<FaGavel className="text-green-600 text-3xl mb-4" />}
            />
            <Card
              cardTitle="View My Invoices"
              cardDesc="Manage and track the status of all your minted invoice NFTs in
                one place."
              cardNavigation="/view-my-invoices"
              cardIcon={
                <FaLayerGroup className="text-purple-600 text-3xl mb-4" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
