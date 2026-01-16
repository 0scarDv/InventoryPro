// src/types/Movement.ts
export interface Movement {
    id: string;
    productId: string;
    type: 'entrada' | 'salida' | 'ajuste';
    quantity: number;
    previousStock: number;
    newStock: number;
    reason: string;
    reference?: string;
    userId: string;
    createdAt: string;
}
