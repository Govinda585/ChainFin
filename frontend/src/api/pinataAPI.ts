/// <reference types="vite/client" />

import axios from "axios";
const URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const headerData = {
  pinata_api_key: import.meta.env.VITE_API_KEY,
  pinata_secret_api_key: import.meta.env.VITE_API_SECRET,
  "Content-Type": "multipart/form-data",
};

export async function PostPDF(data: FormData) {
  const res = await axios.post(URL, data, {
    headers: headerData,
  });
  const cid = res.data.IpfsHash;
  return { res, cid };
}

export async function PostMetadataJSON(jsonData: object) {
  const URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const res = await axios.post(URL, jsonData, {
    headers: {
      pinata_api_key: import.meta.env.VITE_API_KEY,
      pinata_secret_api_key: import.meta.env.VITE_API_SECRET,
      "Content-Type": "application/json",
    },
  });
  return res.data.IpfsHash;
}
