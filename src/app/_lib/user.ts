import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie'
import Error from 'next/error';


const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

// login
export const loginUserService = async (credentials: { email: string; password: string }) => {    
    try {
        const res = await axios.post(
            `${API_URL}/login`,
            credentials,
            { withCredentials: true } 
          );
          
        const token = res.data.token; 
        setCookie('authToken', token);
        
        return token;
    } catch (error:any) {
        console.error("Login error:", error);
        throw new Error(error.response?.data.message || "Login failed"); 
    }
};

// get user data
export const getUserDataService = (token: string) => {
    const decodedToken = jwtDecode(token) as { userImage?: string; username?: string; email?: string };
    return {
        userImage: decodedToken.userImage || null,
        username: decodedToken.username || null,
        email: decodedToken.email || null,
    };
};

// create a user
export const createUserService = async (userData: { email: string; password: string; username: string }) => {
    try {
        const response = await axios.post(`${API_URL}/createUser`, userData);
        return response.data; 
    } catch (error: any) {
        console.error("User creation error:", error);
        throw new Error(error.response?.data.message || "User creation failed");
    }
};

// update user data
export const updateUserService = async (userId: string, updates: object) => {
    try {
        const response = await axios.patch(`${API_URL}/updateUser/${userId}`, updates);
        return response.data;
    } catch (error: any) {
        console.error("User update error:", error);
        throw new Error(error.response?.data.message || "User update failed");
    }
};

// delete user 
export const deleteUserService = async (userId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteUser/${userId}`);
        return response.data;
    } catch (error:any) {
        console.error("User deletion error:", error);
        throw new Error(error.response?.data.message || "User deletion failed");
    }
};

export const refreshTokenService = async (refreshToken: string) => {
    try {
        const response = await axios.post(`${API_URL}/refreshToken`, { refreshToken });
        const newToken = response.data.token; 
        setCookie('authToken', newToken);
        return newToken;
    } catch (error: any) {
        console.error("Token refresh error:", error);
        throw new Error(error.response?.data.message || "Token refresh failed");
    }
};
