import React from 'react'
interface NewProductModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const NewProductModal = ({ isOpen, onClose }: NewProductModalProps) => {
  if (!isOpen) return null
  return (
    <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
      <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto  '>
        <h1>Nuevo Producto</h1>
        <div className=''>
          {/* ID */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="id">ID</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='1' />
          </p>

          {/* SKU */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="sku">SKU</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='LAP-001' />
          </p>

          {/* Nombre */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="name">Nombre del producto</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='MacBook Pro 14' />
          </p>

          {/* CategoryId */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="categoryId">Categoría</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='1' />
          </p>

          {/* Price */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="price">Precio</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1999.99' />
          </p>

          {/* Cost */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="cost">Costo</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" step="0.01" placeholder='1500.00' />
          </p>

          {/* Stock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="stock">Stock actual</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='15' />
          </p>

          {/* MinStock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="minStock">Stock mínimo</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='5' />
          </p>

          {/* MaxStock */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="maxStock">Stock máximo</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="number" placeholder='50' />
          </p>

          {/* Status */}
          <p className='m-2'>
            <label className='text-gray-500' htmlFor="status">Estado</label>
            <input className='border border-gray-300 rounded px-4 py-2 w-full mt-2' type="text" placeholder='active' />
          </p>
        </div>
        <div className='h-24 sticky bottom-0 bg-white mt-2 p-2 flex justify-between items-center mt-4'>
          <button onClick={onClose} className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded'>Cancelar</button>
          <button onClick={onClose} className='w-[45%] h-[70%] bg-green-600 hover:bg-green-700 text-white rounded'>Guardar</button>
        </div>
      </div>
    </div>
  )
}
