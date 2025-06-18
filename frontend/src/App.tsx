import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Supplier/Home";
import MintInvoiceNFT from "./pages/Supplier/MintInvoiceNFT";
import TrackBids from "./pages/Supplier/TrackBids";
import ViewMyInvoices from "./pages/Supplier/ViewMyInvoices";
import Navbar from "./components/navbar";
import UploadInvoice from "./pages/Supplier/UploadInvoice";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-invoice" element={<UploadInvoice />} />
          <Route path="/mint-invoice-nft" element={<MintInvoiceNFT />} />
          <Route path="view-my-invoices" element={<ViewMyInvoices />} />
          <Route path="track-bids" element={<TrackBids />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
