import React from 'react'
import { useGlobalContext } from 'Context'
import { ToggleSwitch } from 'components/Global'
import st from 'styles/AuthPage/remember_me.module.css'

import { UserspaceLocale } from 'locales'

export const RemeberMe = ({ value, valueChanger }) => {
    const { locale } = useGlobalContext()
    return (
        <div className={st.remember_me}>
            <ToggleSwitch
                name='remember'
                value={value}
                onChange={valueChanger.bind(this, !value)}
            />
            <label className={st.slider_text}>{UserspaceLocale['запомнить_меня'][locale]}</label>
        </div>
    )
}
