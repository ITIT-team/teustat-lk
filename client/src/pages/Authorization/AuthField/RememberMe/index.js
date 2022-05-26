import React from 'react'
import { ToggleSwitch } from 'samples/Global/ToggleSwitch'
import st from 'styles/AuthPage/remember_me.module.css'

export const RemeberMe = ({ value, valueChanger }) => {
    return (
        <div className={st.remember_me}>
            <ToggleSwitch
                name='remember'
                value={value}
                onChange={valueChanger.bind(this, !value)}
            />
            <label className={st.slider_text}>Запомнить меня</label>
        </div>
    )
}
