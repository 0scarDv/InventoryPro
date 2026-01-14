import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './App.css'
import { MainLayout } from './components/layout/MainLayout';
import { ProductList } from './components/features/products/ProductList';
import { NewProductModal } from './components/features/products/NewProductModal';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <MainLayout />,
      children: [
        { path: 'products', element: <ProductList /> },
        { path: 'clients', element: <NewProductModal /> }

      ]
    }
  ]);


  return (
    <RouterProvider router={routes} />
  )
}

export default App
