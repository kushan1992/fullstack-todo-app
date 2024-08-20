import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ITask } from '../Interfaces/Task'

interface ITodo {
    task: ITask
    deleteTodo(id: string): void
    editTodo(id: string): void
    toggleComplete(id: string): void
}

export const Todo = (props: ITodo) => {
    const { task, deleteTodo, editTodo, toggleComplete } = props

    return (
        <div className="Todo">
            <p
                className={`${task.status ? 'completed' : ''}`}
                onClick={() => toggleComplete(task.id)}
            >
                {task.title}
            </p>
            <div>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => editTodo(task.id)}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteTodo(task.id)}
                />
            </div>
        </div>
    )
}
