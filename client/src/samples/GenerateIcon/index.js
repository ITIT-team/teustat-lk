import React from "react";
import icon from 'assets/userspace/generate_icon.svg'
import st from 'styles/samples/generate_icon.module.css'

export const GenerateIcon = () => {
    return (
        <div className={st.generate_icon}>
            <img src={icon} alt='icon' />
        </div>
    )
}
