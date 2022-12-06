import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd5adea60-9bd3-42bf-aef9-f6ec89a799fa'
    }
})


//======================================== API ==============================================

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoId}`)
    },
    updateTodolist(todoId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoId}`, {title})
    }
}


//======================================== TYPES ==============================================

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}
