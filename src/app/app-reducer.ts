import {authAPI, LoginParamsType} from "../api/auth-api";
import {setIsLoggedIn} from "../state/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const initializedAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
})

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(initializedAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer;

export const {setAppErrorAC, setAppStatusAC} = slice.actions;




