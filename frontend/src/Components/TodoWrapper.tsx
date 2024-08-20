import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { RootState, AppDispatch } from '../redux/store/store'
import {
    fetchTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus,
} from '../redux/features/todoSlice'
import { Todo } from './Todo'
import { TodoForm } from './TodoForm'
import { EditTodoForm } from './EditTodoForm'
import { ITask } from '../Interfaces/Task'
import 'react-toastify/dist/ReactToastify.css'

export const TodoWrapper = () => {
    const { tasks, status, error } = useSelector(
        (state: RootState) => state.todo
    )
    const [todos, setTodos] = useState<ITask[]>(tasks)
    const dispatch = useDispatch<AppDispatch>()

    const deleteTodo = (id: string) => {
        dispatch(deleteTask(id))
    }

    const toggleComplete = (id: string) => {
        dispatch(toggleTaskStatus(id))
    }

    const editTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: true } : todo
            )
        )
    }

    const editTask = (title: string, id: string) => {
        dispatch(updateTask({ title, id }))
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, status])

    useEffect(() => {
        if (tasks.length > 0) {
            setTodos(tasks)
        }
    }, [tasks])

    useEffect(() => {
        if (status === 'failed') {
            toast.error(error)
        }
    }, [status])

    if (status === 'loading') return <div>Loading...</div>

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done !</h1>
            <TodoForm />
            {/* display todos */}
            {todos &&
                todos.map((todo) =>
                    todo.isEditing ? (
                        <EditTodoForm
                            key={todo.id}
                            editTodo={editTask}
                            task={todo}
                        />
                    ) : (
                        <Todo
                            key={todo.id}
                            task={todo}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                            toggleComplete={toggleComplete}
                        />
                    )
                )}
            <ToastContainer />
        </div>
    )
}
