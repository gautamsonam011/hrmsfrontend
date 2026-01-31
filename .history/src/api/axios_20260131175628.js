import axios from "axios";

const api = axios.create({
  baseURL: "https://YOUR-BACKEND-URL/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
