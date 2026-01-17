import type { Movement } from "../types/Movement";
import api from "./api";


export const getMovements = async (): Promise<Movement[]> => {
    const response = await api.get<Movement[]>('/movements');
    return response.data;
};

export const getMovementById = async (id: string): Promise<Movement> => {
    const response = await api.get<Movement>(`/movements/${id}`);
    return response.data;
};

export const createMovement = async (movement: Movement): Promise<Movement> => {
    const response = await api.post<Movement>('/movements', movement);
    return response.data;
};

export const updateMovement = async (id: string, movement: Movement): Promise<Movement> => {
    const response = await api.put<Movement>(`/movements/${id}`, movement);
    return response.data;
};

export const deleteMovement = async (id: string): Promise<void> => {
    await api.delete(`/movements/${id}`);
};
