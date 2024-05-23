import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  baseURL: "https://admin-api-copy-production.up.railway.app/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// api.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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
