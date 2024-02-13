import Http from "./Http";

export const getProducts = (config) => Http.get("/products", config);

export const getCategories = (config) => Http.get("/categories", config);

export const getCategory = (id, config) => Http.get(`/categories/${id}`, config);

export const getProdctCategory = (id, config) => Http.get(`/categories/${id}/products`, config);

export const getProduct = (id, config) => Http.get(`/products/${id}`, config);

export const getCommentByProduct = (id, config) => Http.get(`/products/${id}/comments`, config);

export const createCommnetsProduct = (id,data, config) => Http.post(`/products/${id}/comments`, data, config);

export const order = (data, config) => Http.post(`/order`, data, config);