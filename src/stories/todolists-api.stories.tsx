import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'todolists-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

       todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = (title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todoId = 'a155d1e0-58af-4513-8e34-ef89ac46b161'
    useEffect(() => {

       todolistsAPI.deleteTodolist(todoId)
            .then((res) =>
            setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = (title: string) => {
    const [state, setState] = useState<any>(null)
    let todoId = 'a155d1e0-58af-4513-8e34-ef89ac46b161'
    useEffect(() => {

       todolistsAPI.updateTodolist(todoId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

