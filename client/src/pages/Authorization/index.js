import React, { useState } from "react"
import { useHttp, usePush } from 'hooks'
import { useMyContext } from 'Context'
import st from 'styles/AuthPage/auth_page.module.css'
import logo from 'assets/main/logo.svg'
import { ForgotPass } from "./ForgotPass"
import { AuthField } from "./AuthField"

export const AuthPage = () => {
    const { setUserData } = useMyContext() 
    const { request, loading } = useHttp()
    const [showLogin, setShowLogin] = useState(true)
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const push = usePush()
    const changeHandler = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    const props = {
        form,
        setShowLogin,
        changeHandler
    }

    const submitHandler = async () => {
        try {
            const data = await request('/auth/authorization', form)
            setUserData(data)
        } catch (e) {
            push(e.message)
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
                        onClick={submitHandler}
                    >
                        {
                            showLogin ?
                            "Войти"
                            :
                            "Выслать пароль"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
