import React, { useState } from 'react'
import { ITask } from '../Interfaces/Task'

interface IEditTodoForm {
    editTodo(value: string, id: string): void
    task: ITask
}

export const EditTodoForm = (props: IEditTodoForm) => {
    const { editTodo, task } = props
    const [value, setValue] = useState(task.title)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // edit todo
        editTodo(value, task.id)
    }
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder="Update task"
            />
            <button type="submit" className="todo-btn">
                Update Task
            </button>
        </form>
    )
}
