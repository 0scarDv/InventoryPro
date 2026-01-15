import React from 'react'
import { TfiAlert } from "react-icons/tfi";
import { GrCircleAlert } from "react-icons/gr";

interface ModalConfirmProps {
    inOpen: boolean;
    onClose?: () => void;
    accion?: string;
    onConfirm?: () => void;
}
export const ModalConfirm = ({ inOpen, onClose, accion, onConfirm }: ModalConfirmProps) => {
    if (!inOpen) return null
    return (
        <div>
            <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>

                <div className='w-full h-full flex flex-col items-center bg-white sm:w-1/3 sm:h-3/8 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto  '>
                    <div className='w-1/8  mb-4 flex flex-col items-center justify-center text-3xl bg-red-200 text-red-400 items-center rounded-full py-2 px-2'><GrCircleAlert /></div>
                    
                    <h1 className='text-xl text-gray-800'>{accion}</h1>
                    <h1 className='text-xl text-gray-400'>¿Estás seguro de esto?</h1>

                    <div className='h-24 w-full sticky bottom-0 bg-white mt-2 p-2 flex justify-between items-center mt-4'>
                        <button onClick={onClose} className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-500 rounded-xl'>Cancelar</button>
                        <button onClick={onConfirm} className='w-[45%] h-[70%] bg-red-600 hover:bg-red-700 text-white rounded-xl'>{accion}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
