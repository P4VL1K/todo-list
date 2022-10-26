import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {ActionsTodolistsType, todolistsReducer} from "../state/todolists-reducer";
import {ActionsTasksType, tasksReducer} from "../state/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ActionsAppType, appReducer} from "./app-reducer";
import {ActionsLoginType, authReducer} from "../state/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//========================== TYPES ===============================

export type AppRootState = ReturnType<typeof rootReducer>
export type ActionsType = ActionsTodolistsType | ActionsTasksType | ActionsAppType | ActionsLoginType
export type AppDispatch = ThunkDispatch<AppRootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>


//========================== HOOKS ===============================

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector