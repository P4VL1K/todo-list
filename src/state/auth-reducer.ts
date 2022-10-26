import {authAPI, LoginParamsType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC} from "../app/app-reducer";
import {AppThunk} from "../app/store";

export type SetIsLoggedInActionType = {
    type: 'login/SET-IS-LOGGED-IN'
    value: boolean
}

export type InitialStateType = {
    isLoggedIn: boolean
}

export type ActionsLoginType = SetIsLoggedInActionType

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionsLoginType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedIn = (value: boolean): SetIsLoggedInActionType => ({type: 'login/SET-IS-LOGGED-IN',
    value})

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}