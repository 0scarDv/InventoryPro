import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getMovements } from '../../../services/MovementService';
import { getProducts } from '../../../services/productService';
import type { Product } from '../../../types/Product';
import type { Movement } from '../../../types/Movement';
//import { NewMovementModal } from './NewMovementModal';

export const MovementList = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Fecha', width: 120 },
    { field: 'productName', headerName: 'Producto', width: 200 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'previousStock', headerName: 'Stock Anterior', width: 140 },
    { field: 'newStock', headerName: 'Stock Nuevo', width: 140 },
    { field: 'reason', headerName: 'Motivo', width: 220 },
  ];

  const fetchData = async () => {
    const [movementsData, productsData] = await Promise.all([
      getMovements(),
      getProducts(),
    ]);

    const enrichedMovements = movementsData.map((m) => {
      const product = productsData.find((p) => p.id === m.productId);
      return {
        ...m,
        productName: product?.name || '—',
      };
    });

    setProducts(productsData);
    setMovements(enrichedMovements);
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="flex flex-col h-full w-full">


      <div className="flex flex-col md:flex-row md:justify-between p-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Movimientos de Inventario
        </h1>

        <input
          type="text"
          placeholder="Buscar movimientos..."
          onChange={(e) => setInputSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2"
          onClick={() => setOpenModal(true)}
        >
          + Nuevo Movimiento
        </button>
      </div>

      <DataGrid
        rows={movements}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};
