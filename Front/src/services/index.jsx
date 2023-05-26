import axios from "axios";

const baseUrl = "http://localhost:8080";

export const createUser = (data) => {
  return axios.post(`${baseUrl}/usuarios/`, data);
};

export const getProducts = () => {
  return axios.get(`${baseUrl}/productos/`);
};

export const getProductDetail = (id) => {
  return axios.get(`${baseUrl}/productos/${id}`);
};
