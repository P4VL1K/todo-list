import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType,
    setTodolistsAC
} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {AppRootState, AppThunk} from "../app/store";
import {TasksStateType} from "../app/App";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id] : []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default: {
            return state
        }
    }
}


//============================================ ACTIONS =============================================

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'UPDATE-TASK', taskId, model, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): UpdateTaskActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}


//============================================ THUNKS =============================================

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTaskTC = (todoId: string, taskId: string): AppThunk => (dispatch) => {
    tasksAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}

export const addTaskTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    tasksAPI.createTask(todoId, title)
        .then(res => {
            console.log(res)
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootState) => {

    const state = getState()
    const task = state.tasks[todoId].find(t => t.id === taskId)
    if (!task) {
        return
    }

    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }

    tasksAPI.updateTask(todoId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(taskId, domainModel, todoId))
        })
}


//============================================ TYPES =============================================

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}
type UpdateTaskActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type ActionsTasksType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}