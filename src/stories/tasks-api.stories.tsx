import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'tasks-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState('')

    const getTasks = () => {
        tasksAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                value={todoId}
                onChange={(e) => {
                    setTodoId(e.currentTarget.value)
                }}
                placeholder={'todolist ID'}
            />
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todoId, setTodoId] = useState('')

    const createTask = () => {
        tasksAPI.createTask(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input
            value={todoId}
            onChange={(e) => {setTodoId(e.currentTarget.value)}}
            placeholder={'todolist ID'}
        />
        <input
            value={title}
            onChange={(e) => {setTitle(e.currentTarget.value)}}
            placeholder={'title for task'}
        />
        <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState('')
    const [todoId, setTodoId] = useState('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input
            value={todoId}
            onChange={(e) => {setTodoId(e.currentTarget.value)}}
            placeholder={'todolist ID'}
        />
        <input
            value={taskId}
            onChange={(e) => {setTaskId(e.currentTarget.value)}}
            placeholder={'task ID'}
        />
        <button onClick={deleteTask}>delete task</button>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '4ddcfe32-093b-4110-b735-8a4eb7bb7f3a'
        let taskId = 'da7fd235-9d81-424d-800b-dbce58e25a94'
        let model = {
            title: 'ttttt',
            description: 'ttttt',
            completed: false,
            status: 1,
            priority: 1,
            startDate: '11',
            deadline: '11'
        }
        tasksAPI.updateTask(todoId, taskId, model)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

