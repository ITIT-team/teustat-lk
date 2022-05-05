import React, { useState } from "react"
import { TextInput } from '../../../../samples/TextInput'

import st from '../../../../styles/AuthPage/login_in_auth.module.css'

export const LoginPass = () => {
    const [form, setForm] = useState({ login: '', password: '' })

    const changeHandler = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className={st.container}>
            <TextInput
                value={form.login}
                onChange={changeHandler}
                name='login'
                topRound
            />
            <TextInput
                value={form.password}
                onChange={changeHandler}
                name='password'
                type='password'
                bottomRound
            />
        </div>
    )
}
