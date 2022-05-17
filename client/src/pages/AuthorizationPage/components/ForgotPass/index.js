import React from "react";
import { TextInput } from "../../../../samples/TextInput";
import st from "./../../../../styles/AuthPage/auth_page.module.css"


export const ForgotPass = ({ form, setShowLogin, changeHandler }) => {
    return (
        <div className={st.forgot_pass_container}>
            <p className={st.go_back} onClick={setShowLogin.bind(this, true)}> X Выслать пароль</p>
            <TextInput
                name='email'
                value={form.email}
                onChange={changeHandler}
                topRound
                bottomRound
                placeholder='Email'
            />
            <div className={st.inbutton}>
                <button>Выслать пароль</button>
            </div>

        </div>
    )
}
