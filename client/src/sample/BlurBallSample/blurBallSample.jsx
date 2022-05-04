import React from "react";
import st from "./blur_ball_sample_style.module.css";
import ball from './../../resources/images/ball.svg'

export const BlurBall = () => {
    return (
        <div className={st.ball}>
            <img src={ball} alt='ball'/>
        </div>
    )
}