import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';


interface ProductRow {
    id: number;
    sku: string;
    name: string;
}

export const ProductList = () => {

    const rows: ProductRow[] = [
        { id: 1, sku: 'SKU001', name: 'Producto 1' },
        { id: 2, sku: 'SKU002', name: 'Producto 2' },
        { id: 3, sku: 'SKU003', name: 'Producto 3' },
        { id: 4, sku: 'SKU004', name: 'Producto 4' },
        { id: 5, sku: 'SKU005', name: 'MacbookM4' },
    ];
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'sku', headerName: 'SKU', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 200 },
    ];
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex justify-between p-8'>
                <h1 className='text-[40px]'>Productos</h1>
                <button className='bg-blue-500 text-white hover:bg-blue-600 rounded-xl'>+ Nuevo Producto</button>

            </div>
            <main>
                <DataGrid
                    rows={rows}
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
