import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import type { Category } from "../../../types/Category";
import { deleteCategory, getCategories } from "../../../services/categoryService";

import { NewCategoryModal } from "./NewCategoryModal";
import { EditCategoryModal } from "./EditCategoryModal";
//import { ViewCategoryModal } from "./ViewCategoryModal";
import { ModalConfirm } from "../../ui/ModalConfirm";
import type { Product } from "../../../types/Product";
import { getProducts } from "../../../services/productService";
import { set } from "react-hook-form";
import { TfiLayoutMenuV } from "react-icons/tfi";

export const CategoriesList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryIdSelected, setCategoryIdSelected] = useState<string>("");
    const [deletable, setDeletable] = useState<boolean>(true);

    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProduct = async () => {
        try {
            const res = await getProducts();
            setProducts(res);
        } catch (error) {
            console.log(error);
        }

    }
    {/*Cuenta la cantidad de prductos por categoria */ }

    const countProductsByCategory = (categoryId: string) => {
        return products.filter((product) => product.categoryId === categoryId).length;
    }
    const deletableCategory = (categoryId: string) => {
        countProductsByCategory(categoryId) === 0 ? setDeletable(true) : setDeletable(false);
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Nombre", width: 200 },
        { field: "description", headerName: "Descripción", width: 200 },
        { field: "color", headerName: "Color", width: 150 },
        {
            field: "", headerName: "Productos asociados", width: 200,
            renderCell: (params) => (countProductsByCategory(params.row.id))
        },
        {
            field: "actions",
            headerName: "Acciones",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-1">


                    {/* Editar */}
                    <button
                        onClick={() => {
                            setCategoryIdSelected(params.row.id);
                            setOpenEditModal(true);
                        }}
                        className="text-gray-800 text-xl hover:bg-orange-500 hover:text-white rounded-full p-2"
                    >
                        <FaRegEdit />
                    </button>

                    {/* Eliminar */}
                    { }
                    <button
                        onClick={() => {
                            setCategoryIdSelected(params.row.id);
                            setOpenConfirmModal(true);
                        }}
                        className="text-gray-800 text-xl hover:bg-red-600 hover:text-white rounded-full p-2"
                    >
                        <MdDeleteOutline />
                    </button>
                </div>
            ),
        },
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, []);

    const handleDelete = async () => {
        if (countProductsByCategory(categoryIdSelected) > 0) {
            setOpenConfirmModal(false);
            alert("No se puede eliminar esta categoría porque tiene productos asociados.");
            return;
        }

        try {
            await deleteCategory(categoryIdSelected);
            setCategories((prev) =>
                prev.filter((cat) => cat.id !== categoryIdSelected)
            );
            setOpenConfirmModal(false);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Modal para nueva categoría */}
            {openNewModal && (
                <NewCategoryModal
                    isOpen={openNewModal}
                    onClose={() => setOpenNewModal(false)}
                    refetch={fetchCategories}
                />
            )}

            {/*Modal de edicion*/}
            {openEditModal && (
                <EditCategoryModal
                    isOpen={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    idCategory={categoryIdSelected}
                    refetch={fetchCategories}
                />
            )}
            {/*Modal de confirmacion*/}
            {openConfirmModal && (
                <ModalConfirm
                    inOpen={openConfirmModal}
                    accion="Eliminar"
                    onClose={() => setOpenConfirmModal(false)}
                    onConfirm={handleDelete}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between p-8">
                <h1 className="font-bold text-indigo-800 text-2xl md:text-3xl flex items-center">
                    Categorías <TfiLayoutMenuV className="ml-2" />
                </h1>
                <button
                    className="bg-indigo-600 text-white hover:bg-indigo-800 rounded-sm px-4 py-2 mt-2 md:mt-0"
                    onClick={() => setOpenNewModal(true)}
                >
                    + Nueva Categoría
                </button>
            </div>

            {/* Tabla */}
            <main className="px-8">
                <DataGrid
                    rows={categories}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}

                    disableRowSelectionOnClick
                    autoHeight
                />
            </main>
        </div>
    );
};
