import React from "react";
import st from './login_pass_style.module.css'

export const LoginPass = () => {
    return (
        <div>
            <div className={st.login}>
                <input/>
            </div>

            <div className={st.pass}>
                <input/>
            </div>  
        </div>
    )
}
