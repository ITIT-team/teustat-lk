import React from "react";
import { InputLoginSample } from "../../../../sample/InputLoginSample/inputLoginSample";
import { InputPasSample } from "../../../../sample/InputPassSample/inputPassSample";

import st from './login_pass_style.module.css'

export const LoginPass = () => {
    return (
        <div className={st.container}>
            <InputLoginSample />
            <InputPasSample />

        </div>
    )
}
