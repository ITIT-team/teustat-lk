import React from "react";
import st from 'styles/samples/toggle_switch.module.css'

export const ToggleSwitch = ({
    name,
    value,
    onChange
}) => {
    return (
        <div className={st.toggle_switch}>
            <label className={st.switch}>
                <input
                    name={name}
                    type="checkbox"
                    value={value}
                    checked={value}
                    onChange={onChange}
                />
                <span className={st.slider} />
            </label>
        </div>
    )
}
