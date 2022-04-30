import React from "react";
import st from "./input_login_sample_style.module.css"

export const InputLoginSample = () =>  {
    return (
        <div className={st.login}>
                <input placeholder='login'/>
        </div>
    )
}