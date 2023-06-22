import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URI;

export const createUser = (data) => {
  return axios.post(`${baseUrl}/usuarios/registrar`, data);
};

export const validateUser = (data) => {
  return axios.post(`${baseUrl}/usuarios/auth`, data);
};

export const getProducts = (currentPage) => {
  return axios.get(
    `${baseUrl}/productos/todos?numeroPagina=${currentPage}&tamanioPagina=10`
  );
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

export const deleteProduct = (id, jwt) => {
  return axios.delete(`${baseUrl}/productos/eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRatingProduct = (id) => {
  return axios.get(`${baseUrl}/puntuaciones/productos/${id}`);
};

export const submitRating = (data) => {
  return axios.post(`${baseUrl}/puntuaciones/`, data);
};
