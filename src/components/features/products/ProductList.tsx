import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { deleteProduct, getProductById, getProducts } from '../../../services/productService';
import { NewProductModal } from './NewProductModal';
import { useParams } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";

import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { ModalConfirm } from '../../ui/ModalConfirm';
import { EditProductModal } from './EditProductModal';
import { ViewProduct } from './ViewProduct';


export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productIdSelected, setProductIdSelected] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openModalViewProduct, setOpenModalViewProduct] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'price', headerName: 'Precio', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 150 },
        { field: 'status', headerName: 'Estado', width: 150 },
        {
            field: 'actions', headerName: 'Acciones', width: 130,
            renderCell: (params) => (
                <div>
                    {/* Vista */}
                    <button onClick={() => {
                        setOpenModalViewProduct(true);
                        setProductIdSelected(params.row.id);
                    }} className='justify-center text-gray-900  text-xl hover:bg-blue-600 hover:text-white rounded-2xl px-2 py-2 cursor-pointer'>
                        <FaEye />
                    </button>

                    {/* Editar */}
                    <button onClick={() => { setOpenEditModal(true); setProductIdSelected(params.row.id); }} className='text-gray-900  text-xl hover:bg-blue-600 hover:bg-orange-500 hover:text-white rounded-3xl  px-2 py-2 cursor-pointer'>
                        <FaRegEdit />
                    </button>

                    {/* Eliminación */}
                    <button onClick={() => {
                        setOpenModalConfirm(true);
                        setProductIdSelected(params.row.id);

                    }} className='text-gray-900 text-xl hover:bg-red-600 hover:text-white rounded-3xl px-2 py-2 cursor-pointer'>
                        <MdDeleteOutline /></button>

                </div>
            )
        },
    ];


    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }

    }
    return (

        <div className='flex flex-col h-full w-full'>
            {openModal && <NewProductModal isOpen={openModal} onClose={() => setOpenModal(false)} />}
            {openModalViewProduct && <ViewProduct isOpen={openModalViewProduct} onClose={() => setOpenModalViewProduct(false)} idProduct={productIdSelected} />}
            {openEditModal && <EditProductModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} idProduct={productIdSelected} refetch={() => { fetchProducts() }} />}
            {openModalConfirm && productIdSelected && <ModalConfirm inOpen={openModalConfirm} onClose={() => setOpenModalConfirm(false)} accion="Eliminar"
                onConfirm={() => {
                    if (productIdSelected) {
                        handleDelete(productIdSelected);
                        setOpenModalConfirm(false);
                    }
                }} />}
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
