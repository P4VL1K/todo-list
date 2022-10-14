import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c89dcbe5-0368-482a-9300-ed145f7cdf2f'
    }
})

export const tasksAPI = {
    getTasks (todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    createTask (todoId: string) {
        return instance.post(`todo-lists/${todoId}/tasks`, {title: 'new task'})
    },
    deleteTask (todoId: string, taskId: string) {
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask (todoId: string, taskId: string, model: PropertiesType) {
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}

export type TaskType = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string | null
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
    items: TaskType
    totalCount: number
    error: string | null
}

export type PropertiesType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}