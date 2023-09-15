import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.API_URL}:3000`,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Accent-Encoding": "gzip, deflate",
  },
});

export default api;
