import React from "react"
import { useGlobalContext } from 'Context'
import { RemeberMe } from "./RememberMe"
import st from "styles/AuthPage/auth_page.module.css"
import { TextInput } from "components/Global/TextInput"

import loginIcon from 'assets/auth/login_icon.svg'
import passwordIcon from 'assets/auth/password_icon.svg'

import { UserspaceLocale, PanelLocale } from 'locales'

export const AuthField = ({ form, setShowLogin, changeHandler }) => {
    const { locale } = useGlobalContext()

    return (
        <>
            <div className={st.container}>
                <TextInput
                    value={form.email}
                    onChange={changeHandler}
                    name='email'
                    topRound
                    placeholder={PanelLocale['email'][locale]}
                    icon={loginIcon}
                />
                <TextInput
                    value={form.password}
                    onChange={changeHandler}
                    name='password'
                    type='password'
                    placeholder={UserspaceLocale['пароль'][locale]}
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
                <p className={st.forgot} onClick={setShowLogin.bind(this, false)}>{UserspaceLocale['забыли_пароль'][locale]}</p>
            </div>
        </>
    )
}
