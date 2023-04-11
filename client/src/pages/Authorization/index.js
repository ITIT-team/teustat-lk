import React, { useState } from "react"
import { TailSpin } from '@agney/react-loading'
import { useHttp, usePush } from 'hooks'
import { useGlobalContext } from 'Context'
import { ForgotPass } from "./ForgotPass"
import { AuthField } from "./AuthField"
import { LanguageSetter } from 'components/UserSpace/LanguageSetter'

import st from 'styles/AuthPage/auth_page.module.css'
import logo from 'assets/main/logo.svg'

import { ErrorsLocale, UserspaceLocale } from 'locales'

export const AuthPage = () => {
    const { setUserData, locale } = useGlobalContext() 
    const { request, loading } = useHttp()
    const [showLogin, setShowLogin] = useState(true)
    const [form, setForm] = useState({
        email: '', password: '', remember: false, language: localStorage.getItem('userLocale') || 'ru'
    })
    const push = usePush()
    const changeHandler = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const props = {
        form,
        setShowLogin,
        changeHandler
    }

    const loginHandler = async () => {
        try {
            const data = await request('/auth/authorization', form)
            setUserData(data)
        } catch (err) {
            push({ messages: ErrorsLocale[err.message]?.[locale] || err.message, err })
        }
    }

    const forgotHandler = async () => {
        try {
            const message = await request('/auth/remember', form)
            push({ messages: message.map(m => UserspaceLocale[m]?.[locale] || m), ok: true })
        } catch (err) {
            push({ messages: ErrorsLocale[err.message]?.[locale] || err.message, err })
        }
    }

    return (
        <div className={st.app_wrapper}>
            <div className={st.logo}>
                <img src={logo} alt="logo"></img>
            </div>
            <h1 className={st.text}>TEUSTAT</h1>
            <div className={st.auth_container}>
                {
                    showLogin
                        ?
                        <AuthField {...props} />
                        :
                        <ForgotPass {...props} />
                }
                <div className={st.inbutton}>
                    <button
                        disabled={loading}
                        onClick={showLogin ? loginHandler : forgotHandler}
                    >
                        {
                            loading
                            ?
                            <TailSpin height='60%' />
                            :
                            <>
                                {
                                    showLogin ?
                                    UserspaceLocale['войти'][locale]
                                    :
                                    UserspaceLocale['выслать_пароль'][locale]
                                }
                            </>
                        }
                    </button>
                </div>
            </div>
            <div className={st.language_changer_container}>
                <LanguageSetter toUp={false} />
            </div>
        </div>
    )
}
