import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'
import type { Product } from '../../types/Product';

export const MainLayout = () => {


    return (
        <div className='flex w-full bg-gray-100 '>
            <aside className='hidden md:block '><SideBar /></aside>
            <div className='flex-1 h-full flex bg-indigo-100/50 pt-6 px-6 overflow-hidden'>
                <Outlet /></div>
        </div>
    )
}
