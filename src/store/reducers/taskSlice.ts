import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Task {
    image: string ;
    title: string;
    description: string;
    _id: string;
    state: string;
    priority: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

// Fetch user tasks
export const getUsersTasks = createAsyncThunk('userTasks/getUsersTasks', async () => {
    try {
        const res = await axios.get(`${API_URL}/`, { withCredentials: true });
        return res.data; 
    } catch (error: any) {
        console.error("Error getting user tasks:", error);
        throw new Error(error.response?.data.message || "Get tasks failed");
    }
});

export const createnewTask = createAsyncThunk(
    'userTasks/createnewTask',
    async ({ formData }: { formData: FormData }) => {
        try {
            const response = await axios.post(`${API_URL}/task`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Task creation failed";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
);


// Fetch user tasks
export const getUserTasks = createAsyncThunk('userTasks/getUserTasks', async () => {
    try {
        const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
        return res.data; 
    } catch (error: any) {
        console.error("Error getting user tasks:", error);
        throw new Error(error.response?.data.message || "Get tasks failed");
    }
});

// Update task state
export const updateStateTask = createAsyncThunk(
    'userTasks/updateStateTask',
    async ({ _id, state }: { _id: string; state: string }) => {
        try {
            const response = await axios.patch(`${API_URL}/${_id}`, { state }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            console.error("Error updating task state:", error);
            throw new Error(error.response?.data?.message || "State update failed");
        }
    }
);

// Update task state
export const updateTask = createAsyncThunk(
    'userTasks/updateTask',
    async ({ formData, _id }: { _id:string | undefined, formData: FormData }) => {
        try {
            const response = await axios.patch(`${API_URL}/${_id}`, formData , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            console.error("Error updating task :", error);
            throw new Error(error.response?.data?.message || "task update failed");
        }
    }
);

// Delete a task
export const deleteTask = createAsyncThunk(
    'userTasks/deleteTask',
    async (_id: string) => {
        try {
            const response = await axios.delete(`${API_URL}/${_id}`, { withCredentials: true });
            return response.data;
        } catch (error: any) {
            console.error("Error deleting task:", error);
            throw new Error(error.response?.data?.message || "Delete task failed");
        }
    }
);

const userTasksSlice = createSlice({
    name: 'userTasks',
    initialState: {
        tasks: [] as Task[],
        allTasks: [] as Task[],
        userTasks: [] as Task[],
        loading: false,
        error: null as string | null,
        filters: {
            state: '',
            priority: '',
            title: '',
        },
    },
    reducers: {
        setFilters: (state, action) => {   
            state.filters = { ...state.filters, ...action.payload };
            state.tasks = state.allTasks.filter((task: Task) => {
                const matchesState = state.filters.state ? task.state === state.filters.state : true;
                const matchesPriority = state.filters.priority ? task.priority === state.filters.priority : true;
                const matchesTitle = state.filters.title ? task.title.toLowerCase().includes(state.filters.title.toLowerCase()) : true;
    
                return matchesState && matchesPriority && matchesTitle;
            });
        },
        clearFilters: (state) => {
            state.filters = { state: '', priority: '', title: '' };
            state.tasks = state.allTasks;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createnewTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createnewTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload); 
                state.allTasks.push(action.payload);
            })
            .addCase(createnewTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(getUsersTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.allTasks = action.payload;
            })
            .addCase(getUsersTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(getUserTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.userTasks = action.payload;
            })
            .addCase(getUserTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(updateStateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task =>
                    task._id === action.payload.task._id ? action.payload.task : task
                );
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.userTasks = state.userTasks.map(task =>
                    task._id === action.payload.task._id ? action.payload.task : task
                );
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.userTasks = state.userTasks.filter(task => task._id !== action.meta.arg);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.error.message || null;
            });
    },
});

export const { setFilters, clearFilters } = userTasksSlice.actions;
export default userTasksSlice.reducer;
