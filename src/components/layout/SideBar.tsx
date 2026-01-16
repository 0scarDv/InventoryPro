import React from 'react'
import { CiShop } from 'react-icons/ci'
import { FaCubes, FaShoppingCart, FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TfiLayoutMenuV } from "react-icons/tfi";
import { IoStatsChartSharp } from "react-icons/io5";
import { PiDeviceRotateBold } from "react-icons/pi";
export const SideBar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className='flex flex-col items-center'>
                <h1 className='text-[100px] text-center p-4'>
                    <CiShop />
                </h1>
            </div>
            <div>
                <Link to="dashboard">
                    <button className='bg-gray-800 w-64 p-4 flex flex-row items-center pl-10 text-[20px] text-gray-100 hover:bg-gray-700'>
                        <IoStatsChartSharp className='mr-4' />Dashboard</button>
                </Link>
                <Link to="products">
                    <button className='bg-gray-800 w-64 p-4 flex flex-row items-center pl-10  text-[20px] text-gray-100 hover:bg-gray-700'>
                        <FaCubes className='mr-4' /> Productos</button>
                </Link>
                <Link to="categories">
                    <button className='bg-gray-800 w-64 p-4 flex flex-row items-center pl-10  text-[20px] text-gray-100 hover:bg-gray-700'>
                        <TfiLayoutMenuV className='mr-4' /> Categorías</button>
                </Link>
                <Link to="movements">
                    <button className='bg-gray-800 w-64 p-4 flex flex-row items-center pl-10  text-[20px]  text-gray-100 hover:bg-gray-700'>
                        <PiDeviceRotateBold className='mr-4' />Movimientos</button>
                </Link>


            </div>
        </div>
    )

}
