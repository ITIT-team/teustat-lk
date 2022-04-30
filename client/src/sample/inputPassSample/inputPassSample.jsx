import React from "react";
import st from "./input_pass_sample_style.module.css"

export const InputPasSample = () => {
    return (
        <div className={st.pass}>
            <input type='password' placeholder='password' />
        </div>
    )
}