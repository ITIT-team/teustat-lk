import React from "react";
import st from './authorizePageStyle.module.css'
import LoginPass from "./loginPass/loginPass";
import RemeberMe from "./rememberMe/rememberMe";

const Authorize = () => {
    return (
        <div className={st.appWrapper}>
            <div className={st.logo}>
                <img src=".\..\resources\logo.svg" alt="logo"></img>
                <p className={st.text}>TEUSTAT</p>
            </div>

            <div className={st.loginput}><LoginPass /></div>

            <div className={st.remember}><RemeberMe /></div>

            <div className={st.forgot}>
                <a href="https://pm1.narvii.com/7442/920e3dfeacb885a2c9fef2680f4917c6831a7b54r1-500-500v2_hq.jpg">Забыли пароль?</a>
            </div>

            <div className={st.inbutton}>
                <button>Войти</button>
            </div>
        </div>
    )
}

export default Authorize