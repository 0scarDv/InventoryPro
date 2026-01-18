import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { LuBoxes } from "react-icons/lu";
import { useEffect, useState } from 'react';
import { LuCircleDollarSign } from "react-icons/lu";
import type { Product } from '../../../types/Product';
import { deleteProduct, getProductById, getProducts } from '../../../services/productService';

import { Link, useParams } from 'react-router-dom';
import { IoEyeOutline, IoStatsChartSharp } from "react-icons/io5";

import { FaBox, FaCubes, FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { ModalConfirm } from '../../ui/ModalConfirm';

import type { Category } from '../../../types/Category';
import { TbPointFilled } from "react-icons/tb";
import { BarCharts } from './BarCharts';



export const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'price', headerName: 'Precio', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 150 },
        { field: 'status', headerName: 'Estado', width: 150 },

    ];
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 4 });






    {/*funcion para calcular stock * value */ }
    const totalInventoryValue = products.reduce((total, product) => {
        return total + product.stock * product.cost;
    }, 0);



    {/*Pedir productos */ }
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

    const filteredProducts = products.filter(product => product.stock <= product.minStock);

    return (

        <div className="flex flex-col h-full w-full">
            {/* Título */}
            <div className="flex flex-col md:flex-row md:justify-between p-8">
                <h1 className="text-2xl font-bold text-indigo-900 md:text-3xl flex items-center">
                    Dashboard <IoStatsChartSharp className="ml-4" />
                </h1>
            </div>

            {/* Cards de resumen */}
            <main className="flex flex-col sm:flex-row gap-4 bg-white rounded-3xl items-center p-4">
                {/* Card 1 */}
                <div className="flex-1 min-w-0 group border border-indigo-600/20 bg-gray-100 hover:text-white m-2 p-4 shadow-xl rounded-xl flex items-center hover:bg-indigo-500 transition-colors">
                    <div className="mr-4 text-indigo-500 group-hover:text-white">
                        <FaBox size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-400 group-hover:text-white">
                            Total de Productos:
                        </h2>
                        <p className="text-3xl font-bold text-gray-800 group-hover:text-white">
                            {products.length}
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex-1 min-w-0 group border border-indigo-600/20 bg-indigo-500 m-2 p-4 shadow-xl rounded-xl flex items-center hover:bg-gray-100 transition-colors">
                    <div className="mr-4 text-white group-hover:text-indigo-500 transition-colors">
                        <LuCircleDollarSign size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-white group-hover:text-indigo-500 transition-colors">
                            Valor total:
                        </h2>
                        <p className="text-3xl font-bold text-white group-hover:text-indigo-500 transition-colors">
                            {totalInventoryValue} $.
                        </p>
                    </div>
                </div>
            </main>

            {/* Lista + Gráfico */}
            <div className="flex flex-col lg:flex-row gap-4 w-full mt-4 mb-4">
                {/* Lista */}
                <div className="flex-1 min-w-0 bg-white rounded-xl shadow-md p-4 overflow-auto">
                    <h2 className="text-indigo-600 font-bold mb-2">Productos con bajo Stock</h2>
                    <DataGrid
                        className="bg-indigo-100"
                        rows={filteredProducts}
                        columns={columns}
                        disableRowSelectionOnClick
                        autoHeight
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    />
                </div>

                {/* Gráfico */}
                <div className="flex-1 min-w-0 bg-white rounded-xl shadow-md p-4">
                    <BarCharts />
                </div>
            </div>
        </div>

    )

}
