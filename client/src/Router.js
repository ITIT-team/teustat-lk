import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { AuthPage } from './pages/Authorization'
import { UserSpace } from './pages/UserSpace'
import { PersonalArea } from './pages/UserSpace/PersonalArea'
import { TestAccess } from './pages/UserSpace/TestAccess'

export const Router = userData => {
    if (userData){
        return (
            <Routes>
                <Route path='/user-space/*' element={<UserSpace /> }>
                    <Route path='clients' element={<PersonalArea /> } />
                    <Route path='test-access' element={<TestAccess />} />
                    <Route path='*' element={<Navigate replace to='clients' />} />
                </Route>
                <Route path='*' element={<Navigate replace to="/user-space/clients" />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/authorization' element={<AuthPage />} />
                <Route path='*' element={<Navigate replace to="/authorization" />} />
            </Routes>
        )
    }
}
