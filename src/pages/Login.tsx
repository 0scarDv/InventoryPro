import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/authAPI"; // tu servicio de login

type LoginFormInputs = {
    email: string;
    password: string;
};

export const Login = () => {
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        setLoginError("");
        const token = await login(data.email, data.password);


        if (!token) {
            setLoginError("Correo o contraseña incorrectos");
            return;
        }

        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory Pro</h1>
                    <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@inventory.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: { value: /\S+@\S+\.\S+/, message: "El correo no es válido" },
                            })}
                        />
                        {/* Mensaje de error solo si hay error */}
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Botón submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                {/* Registro */}
                <div className="flex flex-col mt-6 p-4 bg-gray-50 rounded-lg flex sm:flex-row justify-center items-center">
                    <h1 className="m-1">No tienes una cuenta?</h1>
                    <a href="#" className="text-blue-600 hover:underline">
                        Regístrate aquí
                    </a>
                </div>

                {/* Credenciales de prueba */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">
                        <strong>Credenciales de prueba:</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                        Email: admin@inventory.com
                        Password: admin123
                    </p>
                </div>
            </div>
        </div>
    );
};
