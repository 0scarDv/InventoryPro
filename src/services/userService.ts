import axios from "axios";

const API_URL = 'http://localhost:3001/users';

export async function getAllUsers() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}
export async function getUserById(id: number) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}


export async function createUser(user: { email: string; password: string; role: string }) {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return null;
  }
}