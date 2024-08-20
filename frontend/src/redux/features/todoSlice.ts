// src/features/todoSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ITask } from '../../Interfaces/Task'

interface TodoState {
    tasks: ITask[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

interface updatedTask {
    title: string
    id: string
}

const initialState: TodoState = {
    tasks: [],
    status: 'idle',
    error: null,
}

// Async thunk for fetching tasks from an external API
export const fetchTasks = createAsyncThunk('todo/fetchTasks', async () => {
    const response = await axios.get<ITask[]>(
        'http://localhost:3001/api/tasks/'
    )
    return response.data
})

// Async thunk for adding a new task
export const addTask = createAsyncThunk(
    'todo/addTask',
    async (title: string) => {
        const response = await axios.post<ITask>(
            'http://localhost:3001/api/tasks',
            { title }
        )
        return response.data
    }
)
// Async thunk for updating a task
export const updateTask = createAsyncThunk(
    'todo/updateTask',
    async (updatedTask: updatedTask) => {
        const title = updatedTask.title
        const response = await axios.put<ITask>(
            `http://localhost:3001/api/tasks/${updatedTask.id}`,
            { title }
        )
        return response.data
    }
)

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
    'todo/deleteTask',
    async (id: string) => {
        await axios.delete(`http://localhost:3001/api/tasks/${id}`)
        return id
    }
)

// Async thunk for done a task
export const toggleTaskStatus = createAsyncThunk(
    'todo/toggleTaskStatus',
    async (id: string) => {
        const response = await axios.put<ITask>(
            `http://localhost:3001/api/status/${id}`
        )
        return response.data
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                fetchTasks.fulfilled,
                (state, action: PayloadAction<ITask[]>) => {
                    state.status = 'succeeded'
                    state.tasks = action.payload
                }
            )
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch tasks'
            })
            .addCase(addTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                addTask.fulfilled,
                (state, action: PayloadAction<ITask>) => {
                    state.status = 'succeeded'
                    state.tasks.push(action.payload)
                }
            )
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'Already exist this task'
                toast.error('Already exist this task')
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                updateTask.fulfilled,
                (state, action: PayloadAction<ITask>) => {
                    state.status = 'succeeded'
                    const index = state.tasks.findIndex(
                        (task) => task.id === action.payload.id
                    )
                    if (index !== -1) {
                        state.tasks[index] = action.payload
                    }
                }
            )
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to update tasks'
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                deleteTask.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.status = 'succeeded'
                    state.tasks = state.tasks.filter(
                        (task) => task.id !== action.payload
                    )
                }
            )
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to delete tasks'
            })
            .addCase(toggleTaskStatus.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(
                toggleTaskStatus.fulfilled,
                (state, action: PayloadAction<ITask>) => {
                    state.status = 'succeeded'
                    const index = state.tasks.findIndex(
                        (task) => task.id === action.payload.id
                    )
                    if (index !== -1) {
                        state.tasks[index] = action.payload
                    }
                }
            )
            .addCase(toggleTaskStatus.rejected, (state, action) => {
                state.status = 'failed'
                state.error =
                    action.error.message || 'Failed to toggleTaskStatus tasks'
            })
    },
})

export default todoSlice.reducer
