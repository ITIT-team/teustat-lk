import React from 'react'
import st from 'styles/UserSpace/ClientsPage/text_input_frame.module.css'

export const TextInputFrame = ({ label, icon, ...inputProps }) => {
    return (
        <div className={st.container}>
            <div className={st.label}>{label}</div>
            <input type='text' { ...inputProps } />
            {
                icon && <div className={st.icon}>{icon}</div>
            }
        </div>
    )
}
