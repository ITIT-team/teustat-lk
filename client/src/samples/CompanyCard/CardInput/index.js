import React from "react";
import { GenerateIcon } from "samples/GenerateIcon";
import st from 'styles/samples/card_input.module.css'

export const CardInput = ({
    value,
    userChangeHandler,
    type = 'text',
    placeholder,
    name,
    text,
    isPassword,
}) => {
    return (
        <div className={st.input_container}>

            <div className={st.input_field}>
                <input
                    value={value}
                    onChange={userChangeHandler}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    defaultChecked={true}
                />
            </div>

            <div className={st.input_text}>
                {text}
            </div>

            <div className={st.generate_pass}>
                {
                    isPassword ? <GenerateIcon /> : null
                }
            </div>
        </div>
    )
}
