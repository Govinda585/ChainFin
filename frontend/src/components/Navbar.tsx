import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Button from "./Button";
import { useWalletStore } from "../store/walletStore";
const Navbar = () => {
  const navigate = useNavigate();

  const { connectWallet, address } = useWalletStore();
  const handleSubmit = async () => {
    await connectWallet();
  };

  const isConnect = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connect Wallet";

  return (
    <div className="bg-white">
      <div className="flex justify-between p-4 items-center">
        <img
          src={logo}
          alt="ChainFin Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        <section className="flex gap-10">
          <Link to="/">Home</Link>
          <Link to="/upload-invoice">Upload Invoice</Link>
          <Link to="/mint-invoice-nft">Mint</Link>
          <Link to="/view-my-invoices">Invoices</Link>
          <Link to="/track-bids">Track </Link>
        </section>
        <Button fun={handleSubmit} btnName={isConnect} />
      </div>
    </div>
  );
};

export default Navbar;
