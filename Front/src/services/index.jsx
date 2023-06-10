import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URI;

export const createUser = (data) => {
  return axios.post(`${baseUrl}/usuarios/registrar`, data);
};

export const validateUser = (data) => {
  return axios.post(`${baseUrl}/usuarios/auth`, data);
};

export const getProducts = () => {
  return axios.get(`${baseUrl}/productos/todos`);
};

export const getProductDetail = (id) => {
  return axios.get(`${baseUrl}/productos/id/${id}`);
};

export const getCategories = () => {
  return axios.get(`${baseUrl}/categorias/todos`);
};

export const getCategoryDetail = (id) => {
  return axios.get(`${baseUrl}/productos/categoriaId/${id}`);
};

export const deleteProduct = (id) => {
  return axios.delete(`${baseUrl}/productos/${id}`);
};

export const getRatingProduct = (id) => {
  return axios.get(`${baseUrl}/puntuaciones/productos/${id}`);
};

export const submitRating = (data) => {
  return axios.post(`${baseUrl}/puntuaciones/`, data);
};