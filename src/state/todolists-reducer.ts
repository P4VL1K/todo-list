import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../app/store";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";



export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}


//============================================ ACTIONS =============================================

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
   return {type: "SET-TODOLISTS", todolists}
}
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType): ChangeTodolistEntityStatusActionType => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, todoId})


//============================================ THUNKS =============================================

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            console.log(res.data.data.item)
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTodolistTitleTC = (todoId: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(todoId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todoId, title))
        })
}


//============================================ TYPES =============================================

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    entityStatus: RequestStatusType
    todoId: string
}
export type ActionsTodolistsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType
    | ChangeTodolistEntityStatusActionType

