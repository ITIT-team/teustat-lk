import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import { AuthPage } from 'pages/Authorization'
import { UserSpace } from 'pages/UserSpace'
import { ClientsPage } from 'pages/UserSpace/ClientsPage'
import { TestAccess } from 'pages/UserSpace/TestAccess'
import { PanelPage } from 'pages/UserSpace/PanelPage'
import { AnalyticsPage } from 'pages/UserSpace/AnalyticsPage'
import { ArchivePage } from 'pages/UserSpace/ArchivePage'

const adminRoutes = () => 
    <>
        <Route path='clients' element={<ClientsPage /> } />
        <Route path='test-access' element={<TestAccess /> } />
    </>

export const Router = userData => {
    if (userData){
        return (
            <Routes>
                <Route path='/trial-panel' element={<PanelPage isTrial />}/>
                <Route path='/user-space/*' element={<UserSpace /> }>
                    {
                        userData.accessLevel > 1
                        &&
                        adminRoutes()
                    }
                    <Route path='panel' element={<PanelPage />} />
                    <Route path='analytics' element={<AnalyticsPage />} />
                    <Route path='archive' element={<ArchivePage />} />
                    <Route path='*' element={<Navigate replace to={userData.accessLevel < 2 ? 'panel' : 'clients'} />} />
                </Route>
                <Route
                    path='*'
                    element={<Navigate replace to={`/user-space/${userData.accessLevel < 2 ? 'panel' : 'clients'}`} />}
                />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/authorization' element={<AuthPage />} />
                <Route path='/trial-panel' element={<PanelPage isTrial />}/>
                <Route path='*' element={<Navigate replace to="/authorization" />} />
            </Routes>
        )
    }
}
