import axios from "axios";

export const initInterceptors = () => {
  axios.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("access-token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
};
export const axiosClient = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access-token"),
    },
  });
};
