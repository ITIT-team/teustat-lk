import React from "react";
import st from './rememberMeStyle.module.css'

const RemeberMe = () => {
    return (
        <div className={st.remember}>
            <label className={st.switch}>
                <input type="checkbox"></input>
                <span className={st.slider}>Запомнить меня</span>
            </label>
        </div>

    )
}

export default RemeberMe
