import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'

export const MainLayout = () => {
    return (
        <div className='flex min-h-screen bg-gray-100 '>
            <aside className='hidden md:block'><SideBar /></aside>
            <div className='w-screen h-screen flex bg-gray-100 p-10'><Outlet /></div>
        </div>
    )
}
