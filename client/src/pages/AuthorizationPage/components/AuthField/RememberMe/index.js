import React from "react";
import st from './../../../../../styles/AuthPage/remember_me.module.css'

export const RemeberMe = ({ value, valueChanger }) => {
    return (
        <div className={st.remember_me}>
            <input
                name="remember"
                type="checkbox"
                value={value}
                onChange={valueChanger.bind(this, !value)}
            /><label> Запомнить меня </label> 
        </div>
    )
}
