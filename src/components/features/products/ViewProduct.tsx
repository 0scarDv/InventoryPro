import React, { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getProductById } from '../../../services/productService';
import type { Category } from '../../../types/Category';
import { getCategories } from '../../../services/categoryService';

interface ViewProductProps {
    isOpen: boolean;
    onClose?: () => void;
    idProduct: string;
}

export const ViewProduct = ({ isOpen, onClose, idProduct }: ViewProductProps) => {
    if (!isOpen) return null;

    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        if (!idProduct) return;

        const fetchProduct = async (id: string) => {
            const product = await getProductById(id);
            setProduct(product);
        };
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct(idProduct);
        fetchCategories();
    }, [idProduct]);

    const categoryName = categories.find(cat => cat.id === product?.categoryId)?.name

    if (!product) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-600/70">
                <span className="text-white text-lg">Cargando...</span>
            </div>
        );
    }

    return (
        <div
            onClick={() => onClose?.()}
            className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600/70"
        >
            <div
                onClick={e => e.stopPropagation()} // evita cerrar al hacer click dentro del modal
                className="w-full sm:w-1/2 h-3/4 bg-white rounded-lg p-8 overflow-y-auto"
            >
                <h1 className="text-2xl font-bold mb-4">Detalles del Producto</h1>

                <div className="space-y-4">
                    <p><strong>ID:</strong> {product.id}</p>
                    <p><strong>SKU:</strong> {product.sku}</p>
                    <p><strong>Nombre:</strong> {product.name}</p>
                    <p><strong>Categoría:</strong> {categoryName}</p>
                    <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
                    <p><strong>Costo:</strong> ${product.cost.toFixed(2)}</p>
                    <p><strong>Stock actual:</strong> {product.stock}</p>
                    <p><strong>Stock mínimo:</strong> {product.minStock}</p>
                    <p><strong>Stock máximo:</strong> {product.maxStock}</p>
                    <p><strong>Estado:</strong> {product.status === 'active' ? 'Activo' : 'Inactivo'}</p>
                </div>

                <div className="mt-6 flex justify-center sticky bottom-0 bg-white p-4">
                    <button
                        onClick={() => onClose?.()}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
