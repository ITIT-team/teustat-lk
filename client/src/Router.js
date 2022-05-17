import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { UserSpace } from './pages/UserSpace'
import { AuthPage } from './pages/Authorization'

export const Router = userData => {
    if (userData){
        return (
            <Routes>
                <Route path='/user-space' element={<UserSpace />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/authorization' element={<AuthPage />} />
                <Route path="*" element={<Navigate replace to="/authorization" />} />
            </Routes>
        )
    }
}