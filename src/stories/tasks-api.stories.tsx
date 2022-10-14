import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'tasks-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '4ddcfe32-093b-4110-b735-8a4eb7bb7f3a'
        tasksAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = (title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '4ddcfe32-093b-4110-b735-8a4eb7bb7f3a'
        tasksAPI.createTask(todoId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '4ddcfe32-093b-4110-b735-8a4eb7bb7f3a'
        let taskId = '772ba45f-bfc0-46d1-8359-3e64f1360815'
        tasksAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
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

