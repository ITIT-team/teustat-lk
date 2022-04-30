import React from "react";
import st from './remember_me_style.module.css'

export const RemeberMe = () => {
    return (
        <div className={st.rememberMe}>
            <input type="checkbox" id="toggleRem" /><label> Запомнить меня </label> 
        </div>
    )
}
