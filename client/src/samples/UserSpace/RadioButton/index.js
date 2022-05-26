import React from "react";
import st from 'styles/samples/radio_btn.module.css'

export const RadioButton = ({ checked, setChecked }) =>
    <div
        className={st.radio}
        style={{
            border: checked ? '6px solid var(--hardBlue)' : '1px solid rgba(128, 137, 154, 0.6)'
        }}
        onClick={e => {
            e.stopPropagation()
            setChecked(!checked)
        }}
    ></div>
