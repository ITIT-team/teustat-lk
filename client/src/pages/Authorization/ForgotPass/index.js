import React from "react";
import { TextInput } from "components/Global/TextInput";
import st from "styles/AuthPage/auth_page.module.css"

import emailIcon from 'assets/auth/email_icon.svg'

export const ForgotPass = ({ form, setShowLogin, changeHandler }) => {
    return (
        <>
            <div className={st.go_back} onClick={setShowLogin.bind(this, true)}>
                <div>&times;</div>
                <div>Назад</div>
            </div>
            <TextInput
                name='email'
                value={form.email}
                onChange={changeHandler}
                topRound
                bottomRound
                placeholder='Email'
                icon={emailIcon}
            />
        </>
    )
}
