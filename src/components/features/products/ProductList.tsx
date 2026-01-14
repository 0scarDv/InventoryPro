import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getProductById, getProducts } from '../../../services/productService';
import { NewProductModal } from './NewProductModal';




interface ProductRow {
    id: number;
    sku: string;
    name: string;
}


export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [openModal, setOpenModal] = useState(false);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'price', headerName: 'Precio', width: 150 },
        { field: 'cost', headerName: 'Costo', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 150 },
        { field: 'minStock', headerName: 'Stock Mínimo', width: 100 },
        { field: 'maxStock', headerName: 'Stock Máximo', width: 100 },
        { field: 'status', headerName: 'Estado', width: 200 },
    ];


    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);
    { }

    return (

        <div className='flex flex-col h-full w-full'>
            {openModal && <NewProductModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
            <div className='flex flex-col md:justify-between md:flex-row p-8'>
                <h1 className='text-lx font-bold text-gray-800 md:text-3xl'>Productos</h1>
                <button className='bg-blue-500 m-2 text-white hover:bg-blue-600 rounded-sm md:px-4 md:py-2 cursor-pointer' onClick={() => setOpenModal(true)}>+ Nuevo Producto</button>

            </div>
            <main>
                <DataGrid
                    rows={products}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}

                    checkboxSelection
                    disableRowSelectionOnClick
                    autoHeight

                />


            </main>
        </div>
    )

}
