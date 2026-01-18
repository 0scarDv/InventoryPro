import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './App.css'
import { MainLayout } from './components/layout/MainLayout';
import { ProductList } from './components/features/products/ProductList';
import { Login } from './pages/Login';
import { CategoriesList } from './components/features/categories/CategoriesList';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { MovementList } from './components/features/Movimientos/MovementsList';
import { Dashboard } from './components/features/dashboard/Dashboard';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Login />, // Página de login
    },
    {
      element: <ProtectedRoute />, //
      children: [
        {
          path: '/home',
          element: <MainLayout />, // Layout de la app
          children: [

            { index: true, element: <Dashboard /> },
            { path: 'products', element: <ProductList /> },
            { path: 'categories', element: <CategoriesList /> },
            { path: 'movements', element: <MovementList /> },
          ]
        },
      ]
    }
  ]);


  return (
    <RouterProvider router={routes} />
  )
}

export default App
