import React from 'react'

interface ModalConfirmProps {
    inOpen: boolean;
    onClose?: () => void;
}
export const ModalConfirm = ({ inOpen, onClose }: ModalConfirmProps) => {
    if (!inOpen) return null
    return (
        <div>
            <div className='w-full h-full z-100 bg-gray-600/70 fixed top-0 left-0 flex justify-center items-center'>
                <div className='w-full h-full bg-white sm:w-1/2 sm:h-3/4 rounded-lg pl-8 pr-8 pt-8 overflow-y-auto  '>
                    <h1>Nuevo Producto</h1>

                    <div className='h-24 sticky bottom-0 bg-white mt-2 p-2 flex justify-between items-center mt-4'>
                        <button onClick={onClose} className='w-[45%] h-[70%] bg-gray-200 text-gray-700 hover:bg-gray-300 rounded'>Cancelar</button>
                        <button onClick={onClose} className='w-[45%] h-[70%] bg-green-600 hover:bg-green-700 text-white rounded'>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
