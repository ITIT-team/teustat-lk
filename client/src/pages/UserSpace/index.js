import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useHttp } from 'hooks'
import { useMyContext } from 'Context'
import { Loader } from 'samples/Global/Loader'
import navlink_st from 'styles/UserSpace/navlink.module.css'
import header_st from 'styles/UserSpace/header.module.css'
import 'styles/UserSpace/main_styles.css'

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

export const UserSpace = () => {
    const { request, loading } = useHttp()
    const { userData, setUserData } = useMyContext()

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
            {
                loading ?
                <Loader />
                :
                <section>
                    <header>
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
                            <li>
                                <span
                                    className={navlink_st.passive_navlink}
                                    onClick={logoutHandler}
                                >Выйти</span>
                            </li>
                        </ul>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </section>
            }
        </>
    )
}
