import React, { useState } from "react";
import Button from "./Button";
import { PostPDF } from "../api/pinataAPI";
import { contractInstance } from "../utils/contractInstance";
import { useWalletStore } from "../store/walletStore";

type Invoice = {
  invoiceTitle: string;
  desc: string;
  amount: number;
  file: File | null;
};

const UploadForm = () => {
  const { signer } = useWalletStore();

  const [data, setData] = useState<Invoice>({
    invoiceTitle: "",
    desc: "",
    amount: 1000,
    file: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (e.target instanceof HTMLInputElement && type === "file") {
      const file = e.target.files?.[0] || null;
      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.file) {
      const formData = new FormData();
      formData.append("file", data.file);
      const { cid } = await PostPDF(formData);
      console.log(cid);
      data.file = cid;
      const contract = contractInstance(signer);
      await contract.createInvoice(
        data.invoiceTitle,
        data.desc,
        BigInt(data.amount),
        data.file
      );
      setData({
        invoiceTitle: "",
        desc: "",
        amount: 1000,
        file: null,
      });
      console.log(data);
    } else {
      console.log("Please select file");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 "
      >
        <h3 className="text-2xl font-medium text-center">Upload Invoice</h3>
        <section className="flex flex-col gap-1 mt-5">
          <label className={labelStyle}>Invoice Title</label>
          <input
            className={inputFieldStyle}
            name="invoiceTitle"
            value={data.invoiceTitle}
            type="text"
            placeholder="100 GPU"
            onChange={handleChange}
            required
          />
        </section>
        <section className="flex flex-col gap-1 mt-5">
          <label className={labelStyle}>Description</label>
          <textarea
            className={inputFieldStyle}
            name="desc"
            placeholder="Nvidia h10x2"
            value={data.desc}
            onChange={handleChange}
            rows={3}
            required
          />
        </section>
        <section className="flex flex-col gap-1 mt-5">
          <label className={labelStyle}>Amount(USD)</label>
          <input
            className={inputFieldStyle}
            name="amount"
            type="number"
            value={data.amount}
            onChange={handleChange}
            required
            placeholder="1000"
          />
        </section>
        <input
          className="cursor-pointer mt-5 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          type="file"
          name="file"
          accept=".pdf"
          required
          onChange={handleChange}
        />
        <div className="pt-5">
          <Button btnName="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UploadForm;

const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputFieldStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700";
