import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import navlink_st from '../../styles/UserSpace/navlink.module.css'
import header_st from '../../styles/UserSpace/header.module.css'
import '../../styles/UserSpace/main_styles.css'

import mainLogo from '../../assets/main/logo.svg'

const setActiveLink = ({ isActive }) => isActive ? navlink_st.active_navlink : navlink_st.passive_navlink

export const UserSpace = () => {
    return (
        <section>
            <header>
                <div className={header_st.logo_container}>
                    <img src={mainLogo} alt='Teustat' />
                    <h3>TEUSTAT</h3>
                </div>
                <ul className={header_st.main_menu}>
                    <li>
                        <NavLink to='clients' className={setActiveLink}>Клиенты</NavLink>
                    </li>
                    <li>
                        <NavLink to='test-access' className={setActiveLink}>Тестовый доступ</NavLink>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
        </section>
    )
}
