import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/tasks-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Login} from "../Login";
import {logoutTC} from "../state/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const status = useSelector<AppRootState, RequestStatusType>(st => st.app.status)
    const isInitialized = useSelector<AppRootState, boolean>(st => st.app.isInitialized)
    const isLoggedIn = useSelector<AppRootState, boolean>(st => st.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(initializedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <div>
            {/*<CircularProgress />*/}
        </div>
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit" onClick={logoutHandler}>Log out</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    );
}

export default App;
