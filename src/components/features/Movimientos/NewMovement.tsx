
import React, { useState, useEffect } from 'react'
import { createProduct, getProducts } from '../../../services/productService'
import { getCategories } from '../../../services/categoryService';
import type { Category } from '../../../types/Category';
import Autocomplete from '@mui/material/Autocomplete';
import { set } from 'react-hook-form';
import type { Product } from '../../../types/Product';
import TextField from '@mui/material/TextField';
import { createMovement, getMovements } from '../../../services/movementService';
import type { Movement } from '../../../types/Movement';

interface NewMovementModal {
    isOpen: boolean;
    onClose?: () => void;
    reFetch?: () => void;
}


export const NewMovement = ({ isOpen, onClose, reFetch }: NewMovementModal) => {
    if (!isOpen) return null

    const [products, setProducts] = useState<Product[]>([]);
    const [movements, setMovements] = useState<Movement[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [motive, setMotive] = useState<string>('');






    const [previousStock, setPreviousStock] = useState<number>(0);
    const [newStock, setNewStock] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [minStock, setMinStock] = useState<number>(0);
    const [maxStock, setMaxStock] = useState<number>(0);
    const [type, setType] = useState<'entrada' | 'salida' | 'ajuste'>('entrada');

    useEffect(() => {
        const getData = async () => {
            try {
                const mov = await getMovements();
                setMovements(mov);

                /*getProducts */
                const prod = await getProducts();
                setProducts(prod);


            } catch (error) {
                console.log(error);

            }
        }
        getData();
    }, []);

    const calculateNewStock = () => {
        if (type === 'entrada') {
            setNewStock(previousStock + quantity);
        }
        else if (type === 'salida') {
            setNewStock(previousStock - quantity);
        }
        if (type === 'ajuste') {
            setNewStock(quantity);
        }
    }
    const postMovement = async () => {

        const newMovement = {
            id: String(movements.length + 1),
            productId: selectedProduct?.id || '',
            type,
            quantity,
            previousStock: previousStock,
            newStock: newStock,
            reason: motive,
            userId: "1",
            createdAt: new Date().toISOString(),
        }
        try {
            const createdMovement = await createMovement(newMovement);
            console.log('Movement created successfully:', createdMovement);
        }
        catch (error) {
            console.error('Error creating movement:', error);
        }
        reFetch?.();
    }


    return (
        <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
            <div className='w-full h-full bg-gray-100 sm:w-3/4 sm:h-[80%] rounded-lg pl-8 pr-8 pt-8 overflow-y-auto justify-between flex flex-col p-4'>
                <h1 className='text-indigo-700 text-xl font-bold m-2 mb-4'>Nuevo Movimiento</h1>
                <div className=''>
                    {/* Producto */}
                    <p className='m-2'>
                        <Autocomplete
                            options={products}
                            getOptionLabel={(option) => `${option.sku} - ${option.name}`}
                            onChange={(_, value) => setSelectedProduct(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Producto" />
                            )}
                        />
                    </p>

                    {/* Cantidad */}
                    <p className='m-2 '>
                        <TextField
                            label="Cantidad"
                            type="number"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                        />
                    </p>
                    <p className='m-2'>
                        <label className='text-gray-500' htmlFor="categoryId">Tipo de movimiento</label>
                        <select onChange={(e) => { setType(e.target.value as 'entrada' | 'salida' | 'ajuste') }} className='border border-gray-300 rounded px-4 py-4 w-full mt-2 focus:outline-none focus:ring-1  focus:ring-blue-500 hover:ring-1'>
                            <option className="text-gray-300" value="">Selecciona una opción</option>
                            <option value="entrada">Entrada</option>
                            <option value="salida">Salida</option>
                            <option value="ajuste">Ajuste</option>

                        </select>

                    </p>

                    {/* Motivo */}
                    <p className='m-2'>

                        <TextField
                            label="Motivo"
                            variant="outlined"
                            fullWidth
                            className='mt-2'
                            onChange={(e) => setMotive(e.target.value)}

                        />
                    </p>
                </div>
                <div className='h-24 sticky bottom-0 mt-2 p-2 flex justify-between items-center mt-4'>
                    <button onClick={onClose} className='w-[45%] h-[60%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded shadow-lg'>Cancelar</button>
                    <button onClick={() => {
                        onClose?.();
                        postMovement();

                    }} className='w-[45%] h-[60%] bg-green-600 hover:bg-green-700 text-white rounded shadow-lg'>Guardar</button>
                </div>
            </div>
        </div>
    )
}

