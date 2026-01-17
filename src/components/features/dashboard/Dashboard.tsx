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


    return (

        <div className='flex flex-col h-full w-full'>

            <div className='flex flex-col md:justify-between md:flex-row p-8    '>
                <h1 className='text-2xl font-bold text-indigo-900 md:text-3xl flex items-center'>Dashboard   <IoStatsChartSharp className='ml-4' /></h1>




            </div>

            <main className='flex flex-col w-full h-full  bg-white rounded-3xl flex items-center sm:flex-row sm:items-start'>

                <div className='w-[90%] group border border-indigo-600/20 bg-gray-100  hover:text-white m-2 p-4 shadow-xl rounded-xl  flex flex-row items-center sm:h-1/4 sm:w-1/4 hover:bg-indigo-500 transition-colors'>

                    <div className='mr-4 text-indigo-500 group-hover:text-white'>
                        <FaBox size={24} />
                    </div>
                    <p>
                        <h1 className='text-2xl font-semi text-gray-400 group-hover:text-white'>Total de Productos:</h1>

                        <h1 className='text-3xl font-bold text-gray-800 group-hover:text-white'>{products.length}</h1>
                    </p>
                </div>
                <div className=" w-[90%] group  border border-indigo-600/20 bg-indigo-500 m-2 p-4 shadow-xl rounded-xl flex flex-row items-center sm:h-1/4 sm:w-1/4 hover:bg-gray-100 transition-colors">

                    <div className="mr-4 text-white group-hover:text-indigo-500 transition-colors">
                        <LuCircleDollarSign size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-white group-hover:text-indigo-500 transition-colors">
                            Valor total:
                        </h1>

                        <h1 className="text-3xl font-bold text-white group-hover:text-indigo-500 transition-colors">
                            {totalInventoryValue} $.
                        </h1>
                    </div>



                </div>
                







            </main>
        </div>
    )

}
