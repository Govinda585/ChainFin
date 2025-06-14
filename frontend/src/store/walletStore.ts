import { ethers } from "ethers";
import { create } from "zustand";

type WalletState = {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connectWallet: () => Promise<void>;
};
export const useWalletStore = create<WalletState>((set) => ({
  provider: null,
  signer: null,
  address: null,
  connectWallet: async () => {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    set({ provider, signer, address });
  },
}));
