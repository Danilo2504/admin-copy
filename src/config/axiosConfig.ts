import axios from "axios";
import { signOut } from "next-auth/react";

// baseURL: "https://admin-api-copy-production.up.railway.app/v1",
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      signOut();
    }
    return Promise.reject(error);
  }
);

export default api;
