import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c89dcbe5-0368-482a-9300-ed145f7cdf2f'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist() {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: 'new title'})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todoId}`)
    },
    updateTodolist(todoId: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todoId}`, {title: 'update todolist'})
    }
}

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
