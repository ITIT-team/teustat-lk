import React from "react";
import st from './loginPassStyle.module.css'

const LoginPass = () => {
    return (
        <div>
            <div className={st.login}>
                <input></input>
            </div>

            <div className={st.pass}>
                <input></input>
            </div>
        </div>
    )
}

export default LoginPass