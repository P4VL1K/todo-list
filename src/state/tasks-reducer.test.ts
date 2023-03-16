import {
    changeTaskTitleAC,
    tasksReducer,
    fetchTasksTC, updateTask
} from './tasks-reducer'
import {TasksStateType} from '../app/App'
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {v1} from "uuid";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ]
    }
})


test('status of specified task should be changed', () => {
    let updateModel = {
        title: '',
        status: TaskStatuses.New,
        deadline: '',
        description: '',
        priority: 0,
        startDate: '',
    }
    const action = updateTask.fulfilled({taskId: '2', model: updateModel, todolistId: 'todolistId2'}, 'requestId', {taskId: '2', domainModel: updateModel, todoId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})


test ('title of specified task should be changed', () => {

    const action = changeTaskTitleAC( {taskId: '3', title: 'Redux',todolistId: 'todolistId1'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][2].title).toBe('Redux')
    expect(endState['todolistId2'][2].title).toBe('tea')

})


test('new array should be added when new todolist is added', () => {

    let payload = {todolist: {
            title: 'new todolist',
            id: v1(),
            addedDate: '',
            order: 0
        }};
    const action = addTodolistTC.fulfilled(payload, '', {title: payload.todolist.title})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

    const action = removeTodolistTC.fulfilled({todolistId: 'todolistId2'}, '', {todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


test('empty arrays should be added when we set todolists', () => {
    const action = fetchTodolistsTC.fulfilled({todolists: [
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ]}, '')

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})


test('tasks should be added for todolist', () => {
    //const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'})
    const action = fetchTasksTC.fulfilled({tasks: startState['todolistId1'], todolistId: 'todolistId1'}, '', 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId2'].length).toBe(0)
    expect(endState['todolistId1'].length).toBe(3)
})



