import React, { useState } from "react";
import st from '../../styles/AuthPage/auth_page.module.css'
import logo from '../../assets/main/logo.svg'
import { ForgotPass } from "./ForgotPass";
import { AuthField } from "./AuthField";

export const AuthPage = () => {
    const [showLogin, setShowLogin] = useState(true)
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const changeHandler = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const props = {
        form,
        setShowLogin,
        changeHandler
    }
    return (
        <div className={st.app_wrapper}>
            <div className={st.logo}>
                <img src={logo} alt="logo"></img>
            </div>
            <h1 className={st.text}>TEUSTAT</h1>
            {
                showLogin
                    ?
                    <AuthField {...props} />
                    :
                    <ForgotPass {...props} />
            }
        </div>
    )
}
