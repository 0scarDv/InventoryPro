import axios from "axios";
import { getAllUsers } from "./userService";

const API_URL = 'http://localhost:3001/users';


export async function login(email: string, password: string): Promise<string | null> {
    try {
        const response = await axios.get(API_URL, { params: { email, password } });

        const users = response.data;
        if (users.length === 0) return null;
        const user = users[0];

        const token = btoa(
            JSON.stringify({
                id: user.id,
                email: user.email,
                role: user.role,
                exp: Date.now() + 5 * 60 * 1000,
            })
        );
        localStorage.setItem('token', token);
        return token;

    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}