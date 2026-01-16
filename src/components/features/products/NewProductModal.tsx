import React, { useState, useEffect } from 'react'
import { createProduct } from '../../../services/productService'
import { getCategories } from '../../../services/categoryService';
import type { Category } from '../../../types/Category';

interface NewProductModalProps {
  isOpen: boolean;
  onClose?: () => void;
  reFetch?: () => void;
}

export const NewProductModal = ({ isOpen, onClose, reFetch }: NewProductModalProps) => {
  if (!isOpen) return null
  const [categories, setCategories] = useState<Category[]>([]);
  const [id, setId] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [nameProduct, setNameProduct] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [minStock, setMinStock] = useState<number>(0);
  const [maxStock, setMaxStock] = useState<number>(0);
  const [status, setStatus] = useState<'active' | 'inactive'>('inactive');

  useEffect(() => {
    const getcategory = async () => {
      try {
        const response = await getCategories();
        setCategories(response);

      } catch (error) {
        console.log(error);

      }
    }
    getcategory();
  }, []);

  const postProduct = async () => {
    const newProduct = {
      id,
      sku,
      name: nameProduct,
      categoryId,
      price,
      cost,
      stock,
      minStock,
      maxStock,
      status
    }
    try {
      const createdProduct = await createProduct(newProduct);
      console.log('Product created successfully:', createdProduct);
    }
    catch (error) {
      console.error('Error creating product:', error);
    }
    reFetch?.();
  }


  return (
    <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
      <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto  '>
        <h1 className='text-gray-600 text-xl font-bold ml-2'>Nuevo Producto</h1>
        <div className=''>
          {/* ID */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="id">ID</label>
            <input onChange={(e) => setId(e.target.value)} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='1' />
          </p>

          {/* SKU */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="sku">SKU</label>
            <input onChange={(e) => setSku(e.target.value)} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='LAP-001' />
          </p>

          {/* Nombre */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="name">Nombre del producto</label>
            <input onChange={(e) => { setNameProduct(e.target.value) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='MacBook Pro 14' />
          </p>

          {/* CategoryId */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="categoryId">Categoría</label>
            <select value={categoryId} id="categoryId" onChange={(e) => { setCategoryId(e.target.value) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2'>
              <option value="">Selecciona una opción</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>

          </p>

          {/* Price */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="price">Precio</label>
            <input onChange={(e) => { setPrice(Number(e.target.value)) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1999.99' />
          </p>

          {/* Cost */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="cost">Costo</label>
            <input onChange={(e) => { setCost(Number(e.target.value)) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1500.00' />
          </p>

          {/* Stock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="stock">Stock actual</label>
            <input onChange={(e) => { setStock(Number(e.target.value)) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='15' />
          </p>

          {/* MinStock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="minStock">Stock mínimo</label>
            <input onChange={(e) => { setMinStock(Number(e.target.value)) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='5' />
          </p>

          {/* MaxStock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="maxStock">Stock máximo</label>
            <input onChange={(e) => { setMaxStock(Number(e.target.value)) }} className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='50' />
          </p>

          {/* Status */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="status">Estado</label>

            <select
              className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
              value={status}
              onChange={e => setStatus(e.target.value as 'active' | 'inactive')}
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </p>
        </div>
        <div className='h-24 sticky bottom-0 bg-white mt-2 p-2 flex justify-between items-center mt-4'>
          <button onClick={onClose} className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded'>Cancelar</button>
          <button onClick={() => {
            onClose?.();
            postProduct();

          }} className='w-[45%] h-[70%] bg-green-600 hover:bg-green-700 text-white rounded'>Guardar</button>
        </div>
      </div>
    </div>
  )
}
