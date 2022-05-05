import React from 'react'
import st from '../../styles/text_input.module.css'

export const TextInput = ({
    value,
    onChange,
    placeholder,
    type='text',
    name,
    topRound,
    bottomRound
}) => {
    return (
        <div
            className={st.input_container}
            style={{
                borderTopLeftRadius: topRound ? '10px' : '',
                borderTopRightRadius: topRound ? '10px' : '',
                borderBottomLeftRadius: bottomRound ? '10px' : '',
                borderBottomRightRadius: bottomRound ? '10px' : ''
            }}
        >
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                name={name}
            />
        </div>
    )
}