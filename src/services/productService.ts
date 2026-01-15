import type { Product } from "../types/Product";
import api from "./api";

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
}
export const getProductById = async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    await api.delete('/products/' + id);
}
export const updateProduct = async (id: string, newProduct: Product): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, newProduct);
    return response.data;
}