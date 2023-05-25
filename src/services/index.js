import axios from "axios";

export const getProducts = () => {
  return axios.get("http://localhost:8080/productos/");
};

export const getProductDetail = (id) => {
  return axios.get(`http://localhost:8080/productos/${id}`);
};
