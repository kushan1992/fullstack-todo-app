import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store/store'
import { addTask } from '../redux/features/todoSlice'

export const TodoForm = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e: any) => {
        // prevent default action
        e.preventDefault()
        if (value.trim()) {
            dispatch(addTask(value))
            setValue('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder="What is the task today?"
            />
            <button type="submit" className="todo-btn">
                Add Task
            </button>
        </form>
    )
}
