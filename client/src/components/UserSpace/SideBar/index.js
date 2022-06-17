import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useMyContext } from 'Context'
import navlink_st from 'styles/UserSpace/navlink.module.css'
import header_st from 'styles/UserSpace/header.module.css'

import mainLogo from 'assets/main/logo.svg'

const setActiveLink = ({ isActive }) => isActive ? navlink_st.active_navlink : navlink_st.passive_navlink

const adminLinks = () => 
    <>
        <li>
            <NavLink to='clients' className={setActiveLink}>Клиенты</NavLink>
        </li>
        <li>
            <NavLink to='test-access' className={setActiveLink}>Тестовый доступ</NavLink>
        </li>
    </>

export const SideBar = ({ request }) => {
  const { userData, setUserData } = useMyContext()
  const [opened, setOpened] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpened(false)
  }, [location.pathname])

  const logoutHandler = async () => {
    try {
        await request('/auth/logout')
        setUserData(null)
    } catch (e) {
        console.warn(e)
    }
  }

  return (
    <>
    <header style={{
        left: opened ? 0 : -200
    }}>
      <div
        className={header_st.close_sidebar}
        onClick={setOpened.bind(this, false)}
      >|&larr;</div>
      <div className={header_st.logo_container}>
        <img src={mainLogo} alt='Teustat' />
        <h3>{userData.name}</h3>
      </div>
      <ul className={header_st.main_menu}>
        {
            userData.accessLevel > 1
            &&
            adminLinks()
        }
        <li>
        <NavLink to='panel' className={setActiveLink}>Панель ставок</NavLink>
        </li>
        {
            userData.powerBIUrl?.length !== 0
            &&
            <li>
            <NavLink to='analytics' className={setActiveLink}>Аналитика</NavLink>
            </li>
        }
        <li>
            <span
            className={navlink_st.passive_navlink}
            onClick={logoutHandler}
            >Выйти</span>
        </li>
      </ul>
    </header>
    <div
      className={header_st.burger}
      onClick={setOpened.bind(this, true)}
    >|||</div>
    {
      opened
      &&
      <div
        className={header_st.blur}
        onClick={setOpened.bind(this, false)}
      />
    }
    </>
  )
}
