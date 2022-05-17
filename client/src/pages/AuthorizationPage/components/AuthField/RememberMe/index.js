import React from "react";
import st from './../../../../../styles/AuthPage/remember_me.module.css'

export const RemeberMe = ({ value, valueChanger }) => {
    return (
        <div className={st.remember_me}>
            <label className={st.switch}>
                <input
                    name="remember"
                    type="checkbox"
                    value={value}
                    onChange={valueChanger.bind(this, !value)}
                />
                <span className={st.slider} />
            </label>
            <label className={st.slider_text}>Запомнить меня</label>
        </div>
    )
}
