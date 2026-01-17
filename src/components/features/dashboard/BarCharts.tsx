import React, { useEffect, useState } from 'react'


import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { getMovements } from '../../../services/movementService';
import type { Movement } from '../../../types/Movement';

interface MovementData {
    type: "entrada" | "salida" | "ajuste";
    total: number;
}


export const BarCharts = () => {
    const [data, setData] = useState<MovementData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movements: Movement[] = await getMovements();

                // Agrupar movimientos por tipo y sumar cantidades
                const totals: Record<string, number> = { entrada: 0, salida: 0, ajuste: 0 };
                movements.forEach((mov) => {
                    totals[mov.type] += mov.quantity;
                });

                setData([
                    { type: "entrada", total: totals.entrada },
                    { type: "salida", total: totals.salida },
                    { type: "ajuste", total: totals.ajuste },
                ]);
            } catch (error) {
                console.error("Error fetching movements:", error);
            }
        };
        fetchData();

    }, []);

    const colors: Record<string, string> = {
        entrada: "#22c55e", // verde
        salida: "#ef4444", // rojo
        ajuste: "#facc15", // amarillo
    };

    return (
        <div className="bg-red-300 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Movimientos de Inventario
            </h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total">
                        {data.map((entry) => (
                            <Cell key={entry.type} fill={colors[entry.type]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
