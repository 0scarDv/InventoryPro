import React, { useEffect, useState } from 'react'

import type { Product } from '../../../types/Product';
import { getProductById, updateProduct } from '../../../services/productService';
interface NewProductModalProps {
    isOpen: boolean;
    onClose?: () => void;
    idProduct: string;
    refetch?: () => void;
}
export const EditProductModal = ({ isOpen, onClose, idProduct, refetch }: NewProductModalProps) => {
    if (!isOpen) return null
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!idProduct) return;
        const getProduct = async (id: string) => {
            const product = await getProductById(id);
            setProduct(product);

        };
        getProduct(idProduct);
    }, [idProduct]);

    const putProduct = async () => {
        if (!product) return;
        const updatedProduct = {
            ...product,
        };

        await updateProduct(idProduct, updatedProduct);
        refetch?.();
    }

    return (
        <div  className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
            <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rouInded-lg pl-8 pr-8 pt-8 overflow-y-auto  '>
                <h1>Nuevo Producto</h1>
                <div className=''>


                    {/* SKU */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="sku">SKU</label>
                        <input value={product?.sku} onChange={(e) => { setProduct(prev => prev ? { ...prev, sku: e.target.value } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='LAP-001' />
                    </p>

                    {/* Nombre */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="name">Nombre del producto</label>
                        <input value={product?.name} onChange={(e) => { setProduct(prev => prev ? { ...prev, name: e.target.value } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='MacBook Pro 14' />
                    </p>

                    {/* CategoryId */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="categoryId">Categoría</label>
                        <input value={product?.categoryId} onChange={(e) => { setProduct(prev => prev ? { ...prev, categoryId: e.target.value } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='1' />
                    </p>

                    {/* Price */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="price">Precio</label>
                        <input value={product?.price} onChange={(e) => { setProduct(prev => prev ? { ...prev, price: Number(e.target.value) } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1999.99' />
                    </p>

                    {/* Cost */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="cost">Costo</label>
                        <input value={product?.cost} onChange={(e) => { setProduct(prev => prev ? { ...prev, cost: Number(e.target.value) } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1500.00' />
                    </p>

                    {/* Stock */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="stock">Stock actual</label>
                        <input value={product?.stock} onChange={(e) => { setProduct(prev => prev ? { ...prev, stock: Number(e.target.value) } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='15' />
                    </p>

                    {/* MinStock */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="minStock">Stock mínimo</label>
                        <input value={product?.minStock} onChange={(e) => { setProduct(prev => prev ? { ...prev, minStock: Number(e.target.value) } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='5' />
                    </p>

                    {/* MaxStock */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="maxStock">Stock máximo</label>
                        <input value={product?.maxStock} onChange={(e) => { setProduct(prev => prev ? { ...prev, maxStock: Number(e.target.value) } : prev) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='50' />
                    </p>

                    {/* Status */}
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="status">Estado</label>

                        <select
                            className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
                            value={product?.status}
                            onChange={(e) => { setProduct(prev => prev ? { ...prev, status: e.target.value as 'active' | 'inactive' } : prev) }}
                        >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </p>
                </div>
                <div className='h-24  sticky bottom-0 bg-white mt-2 p-2 flex justify-between items-center mt-4'>
                    <button onClick={onClose} className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded'>Cancelar</button>
                    <button onClick={() => {
                        putProduct();
                        onClose?.();

                    }} className='w-[45%] h-[70%] bg-green-600 hover:bg-green-700 text-white rounded'>Guardar</button>
                </div>
            </div>
        </div>
    )
}
