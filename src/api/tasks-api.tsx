import axios from "axios";
import {ResponseType} from "./todolists-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c89dcbe5-0368-482a-9300-ed145f7cdf2f'
    }
})


//======================================== API ==============================================

export const tasksAPI = {
    getTasks (todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    createTask (todoId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask (todoId: string, taskId: string) {
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask (todoId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}


//======================================== TYPES ==============================================

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}