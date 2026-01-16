import React from 'react'
import { createCategory } from '../../../services/categoryService'

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose?: () => void;
  refetch?: () => void;
  idCategory?: string;
}

export const NewCategoryModal = ({ isOpen, onClose }: NewCategoryModalProps) => {
  if (!isOpen) return null

  const [id, setId] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');

  const postCategory = async () => {
    const newCategory = {
      id,
      name,
      description,
      color,
    };

    try {
      const createdCategory = await createCategory(newCategory);
      console.log('Category created successfully:', createdCategory);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
      <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto'>
        <h1 className='text-gray-600 text-xl font-bold ml-2'>
          Nueva Categoría
        </h1>

        <div>
          {/* ID */}
          <p className='m-2'>
            <label className='text-gray-500'>ID</label>
            <input
              onChange={(e) => setId(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
              type="text"
              placeholder='1'
            />
          </p>

          {/* Nombre */}
          <p className='m-2'>
            <label className='text-gray-500'>Nombre</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
              type="text"
              placeholder='Electrónica'
            />
          </p>

          {/* Descripción */}
          <p className='m-2'>
            <label className='text-gray-500'>Descripción</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
              placeholder='Productos electrónicos y tecnología'
            />
          </p>

          {/* Color */}
          <p className='m-2'>
            <label className='text-gray-500'>Color</label>
            <input
              onChange={(e) => setColor(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
              type="text"
              placeholder='#3B82F6'
            />
          </p>
        </div>

        <div className='h-24 sticky bottom-0 bg-white p-2 flex justify-between items-center mt-4'>
          <button
            onClick={onClose}
            className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded'
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              postCategory();
              onClose?.();
            }}
            className='w-[45%] h-[70%] bg-green-600 hover:bg-green-700 text-white rounded'
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
