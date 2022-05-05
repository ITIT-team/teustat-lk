import React from "react";
import st from './authorize_page_style.module.css'
import { LoginPass } from "./LoginPass/loginPass";
import { RemeberMe } from "./RememberMe/rememberMe";
import logo from './../../../resources/images/logo.svg'
//mport { BlurBall } from "../../sample/BlurBallSample/blurBallSample";

export const AuthPage = () => {
    return (
        <div className={st.appWrapper}>
            <div className={st.logo}>
                <img src={logo} alt="logo"></img>
            </div>

            <p className={st.text}>TEUSTAT</p>

            <LoginPass />
            <RemeberMe />

            <div className={st.forgot}>
                <a href="https://pm1.narvii.com/7442/920e3dfeacb885a2c9fef2680f4917c6831a7b54r1-500-500v2_hq.jpg">Забыли пароль?</a>
            </div>

            <div className={st.inbutton}>
                <button>Войти</button>
            </div>
        </div>
    )
}
