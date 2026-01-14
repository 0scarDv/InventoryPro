export interface Product {
    id: string;
    sku: string;
    name: string;
    categoryId: string;
    price: number;
    cost: number;
    stock: number;
    minStock: number;
    maxStock: number;
    status: 'active' | 'inactive'; // si solo puede ser "active" o "inactive"
}
