import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './App.css'
import { MainLayout } from './components/layout/MainLayout';
import { ProductList } from './components/features/products/ProductList';
import { Login } from './pages/Login';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Login />, // Página de login
    },
    {
      path: '/home',
      element: <MainLayout />, // Layout de la app
      children: [
        { path: 'products', element: <ProductList /> },
      ]
    }
  ]);

  return (
    <RouterProvider router={routes} />
  )
}

export default App
