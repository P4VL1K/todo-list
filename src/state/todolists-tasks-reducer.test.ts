import {addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../app/App";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let payload = {todolist: {
            title: 'new todolist',
            id: v1(),
            order: 0,
            addedDate: ''
        }};
    const action = addTodolistTC.fulfilled(payload, '', {title: payload.todolist.title})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
