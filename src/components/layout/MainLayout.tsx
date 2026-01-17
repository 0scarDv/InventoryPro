import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'
import type { Product } from '../../types/Product';

export const MainLayout = () => {


    return (
        <div className='flex min-h-screen bg-gray-200 '>
            <aside className='hidden md:block '><SideBar /></aside>
            <div className='w-screen h-screen flex bg-indigo-100/50 p-10'><Outlet /></div>
        </div>
    )
}
