import React from "react"
import { RemeberMe } from "./RememberMe"
import st from "../../../styles/AuthPage/auth_page.module.css"
import { TextInput } from "../../../samples/TextInput"

import loginIcon from '../../../assets/auth/login_icon.svg'
import passwordIcon from '../../../assets/auth/password_icon.svg'

export const AuthField = ({ form, setShowLogin, changeHandler }) => {
    return (
        <div className={st.auth_container}>
            <div className={st.container}>
                <TextInput
                    value={form.email}
                    onChange={changeHandler}
                    name='email'
                    topRound
                    placeholder='Email'
                    icon={loginIcon}
                />
                <TextInput
                    value={form.password}
                    onChange={changeHandler}
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    bottomRound
                    icon={passwordIcon}
                />
            </div>
            <div className={st.auth_options}>
                <RemeberMe
                    value={form.remember}
                    valueChanger={value => {
                        const e = {
                            target: {
                                name: 'remember',
                                value
                            }
                        }
                        changeHandler(e)
                    }}
                />
                <p className={st.forgot} onClick={setShowLogin.bind(this, false)}>Забыли пароль?</p>
            </div>
            <div className={st.inbutton}>
                <button>Войти</button>
            </div>
        </div>
    )
}
