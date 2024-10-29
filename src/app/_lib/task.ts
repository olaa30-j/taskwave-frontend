import axios from 'axios';
import Error from 'next/error';

export interface TaskData {
    title: string;
    description: string;
    priority: string;
    image: File | null; 
    state: string
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

// get user tasks
export const getUserTasksService = async () => {    
    try {
        const res = await axios.get(`${API_URL}/user`, {withCredentials: true});
        const userTasks = res.data;         
        return userTasks;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error getting user tasks:", error);
        throw new Error(error.response?.data.message || "Get tasks failed"); 
    }
};