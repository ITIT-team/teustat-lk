import React from 'react'
import st from 'styles/samples/simple_text_input.module.css'

export const SimpleTextInput = ({
    icon=null,
    bold=false,
    ...props
}) => {
    return (
        <div className={st.sti_container}>
            <input type='text' {...props} style={{ fontWeight: bold ? 600 : 200 }}/>
            {
                icon
                &&
                <div className={st.sti_icon}>
                    <img src={icon} alt="input icon" />
                </div>
            }
        </div>
    )
}