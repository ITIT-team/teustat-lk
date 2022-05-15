import React from "react";
import { RemeberMe } from "./RememberMe";
import st from "./../../../../styles/AuthPage/auth_page.module.css"
import { TextInput } from "../../../../samples/TextInput";

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
            />
            <TextInput
                value={form.password}
                onChange={changeHandler}
                name='password'
                type='password'
                placeholder='Пароль'
                bottomRound
            />
        </div>
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

            <p onClick={setShowLogin.bind(this, false)}>Забыли пароль?</p>

            <div className={st.inbutton}>
                <button>Войти</button>
            </div>
        </div>
    )
}
