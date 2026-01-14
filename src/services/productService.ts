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
