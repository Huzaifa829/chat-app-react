import React, { useState} from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import LoginPage from './components/login/Login'

import ForgotPsword from './components/login/ForgotPsword'
import UsersState from './Context/UserState';

const FrontPage = () => {

    return (
        <>
            <UsersState>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/forget-password" element={<ForgotPsword />} />
                        <Route path="/" element={<App />}>
                        </Route>
                    </Routes>
                </BrowserRouter >
            </UsersState>

        </>
    )
}

export default FrontPage