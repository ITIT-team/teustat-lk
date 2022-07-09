import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { AuthPage } from './pages/Authorization'
import { UserSpace } from './pages/UserSpace'
import { ClientsPage } from './pages/UserSpace/ClientsPage'
import { TestAccess } from './pages/UserSpace/TestAccess'
import { PanelPage } from './pages/UserSpace/PanelPage'
import { AnalyticsPage } from './pages/UserSpace/AnalyticsPage'

const adminRoutes = () => 
    <>
        <Route path='clients' element={<ClientsPage /> } />
        <Route path='test-access' element={<TestAccess /> } />
    </>

const accessedClientRoutes = userData => {
    if (userData.accessPanel) return 'panel'
    if (userData.accessAnalytics) return 'analytics'
    return 'panel'
}

export const Router = userData => {
    if (userData){
        return (
            <Routes>
                <Route path='/user-space/*' element={<UserSpace /> }>
                    {
                        userData.accessLevel > 1
                        &&
                        adminRoutes()
                    }
                    <Route path='panel' element={<PanelPage />} />
                    <Route path='analytics' element={<AnalyticsPage />} />
                    <Route path='*' element={<Navigate replace to={userData.accessLevel < 2 ? accessedClientRoutes(userData) : 'clients'} />} />
                </Route>
                <Route
                    path='*'
                    element={<Navigate replace to={`/user-space/${userData.accessLevel < 2 ? accessedClientRoutes(userData) : 'clients'}`} />}
                />
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
