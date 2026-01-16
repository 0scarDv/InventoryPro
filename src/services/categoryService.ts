import type { Category } from "../types/Category";
import api from "./api";

// Obtener todas las categorías
export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
};

// Categoría por ID
export const getCategoryById = async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
};

// Crear 
export const createCategory = async (category: Category): Promise<Category> => {
    const response = await api.post<Category>("/categories", category);
    return response.data;
};

// Eliminar 
export const deleteCategory = async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
};

// Actualizar 
export const updateCategory = async (
    id: string,
    newCategory: Category
): Promise<Category> => {
    const response = await api.put<Category>(`/categories/${id}`, newCategory);
    return response.data;
};
