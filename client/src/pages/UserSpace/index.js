import React from 'react'
import { Outlet } from 'react-router-dom'
import { useHttp } from 'hooks'
import { Loader } from 'components/Global/Loader'
import { SideBar } from 'components/UserSpace/SideBar'

import 'styles/UserSpace/main_styles.css'

export const UserSpace = () => {
  const { request, loading } = useHttp()
  
  return (
    <>
      {
        loading ?
        <Loader />
        :
        <section>
          <SideBar request={request} />
          <main>
            <Outlet />
          </main>
        </section>
      }
    </>
  )
}
