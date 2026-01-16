import React, { useEffect, useState } from 'react'
import type { Category } from '../../../types/Category'
import { getCategoryById, updateCategory } from '../../../services/categoryService'

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose?: () => void;
    idCategory: string;
    refetch?: () => void;
}

export const EditCategoryModal = ({
    isOpen,
    onClose,
    idCategory,
    refetch,
}: EditCategoryModalProps) => {
    if (!isOpen) return null

    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (!idCategory) return;

        const fetchCategory = async (id: string) => {
            const data = await getCategoryById(id);
            setCategory(data);
        };

        fetchCategory(idCategory);
    }, [idCategory]);

    const putCategory = async () => {
        if (!category) return;

        await updateCategory(idCategory, category);
        refetch?.();
    };

    return (
        <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
            <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto'>
                <h1 className='text-xl font-bold text-gray-600 ml-2'>
                    Editar Categoría
                </h1>

                <div>
                    {/* Nombre */}
                    <p className='m-2'>
                        <label className='text-gray-500'>Nombre</label>
                        <input
                            value={category?.name || ''}
                            onChange={(e) =>
                                setCategory(prev =>
                                    prev ? { ...prev, name: e.target.value } : prev
                                )
                            }
                            className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
                            type="text"
                            placeholder='Electrónica'
                        />
                    </p>

                    {/* Descripción */}
                    <p className='m-2'>
                        <label className='text-gray-500'>Descripción</label>
                        <textarea
                            value={category?.description || ''}
                            onChange={(e) =>
                                setCategory(prev =>
                                    prev ? { ...prev, description: e.target.value } : prev
                                )
                            }
                            className='border border-gray-300 rounded px-4 py-2 w-full mt-2'
                            placeholder='Productos electrónicos y tecnología'
                        />
                    </p>

                    {/* Color */}

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
                            putCategory();
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
