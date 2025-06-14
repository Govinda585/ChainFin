import { useEffect, useState } from "react";

type Bid = {
  wallet: string;
  amount: number;
  date: string;
};

const dummyBids: Bid[] = [
  { wallet: "0xAbC123...", amount: 1000, date: "2025-05-20" },
  { wallet: "0xDfE456...", amount: 1500, date: "2025-05-22" },
];

export default function TrackBids() {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    // Fetch from blockchain or backend
    setBids(dummyBids);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Bids & Payments</h1>
      <table className="w-full border rounded shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Wallet</th>
            <th className="text-left p-3">Amount</th>
            <th className="text-left p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-3">{bid.wallet}</td>
              <td className="p-3">${bid.amount}</td>
              <td className="p-3">{bid.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
