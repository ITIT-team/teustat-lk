import React, { useState } from "react"
import { TextInput } from '../../../../../samples/TextInput'

import st from '../../../../../styles/AuthPage/login_in_auth.module.css'

export const LoginPass = () => {
    const [form, setForm] = useState({ Email: '', password: '' })

    const changeHandler = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className={st.container}>
            <TextInput
                value={form.login}
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
    )
}
