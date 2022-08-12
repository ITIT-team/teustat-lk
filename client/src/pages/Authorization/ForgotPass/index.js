import React from "react";
import { useGlobalContext } from 'Context'
import { TextInput } from "components/Global/TextInput";
import st from "styles/AuthPage/auth_page.module.css"

import emailIcon from 'assets/auth/email_icon.svg'

import { PanelLocale, UserspaceLocale } from 'locales'

export const ForgotPass = ({ form, setShowLogin, changeHandler }) => {
    const { locale } = useGlobalContext()

    return (
        <>
            <div className={st.go_back} onClick={setShowLogin.bind(this, true)}>
                <div>&times;</div>
                <div>{UserspaceLocale['назад'][locale]}</div>
            </div>
            <TextInput
                name='email'
                value={form.email}
                onChange={changeHandler}
                topRound
                bottomRound
                placeholder={PanelLocale['email'][locale]}
                icon={emailIcon}
            />
        </>
    )
}
