import React from 'react'
import { TailSpin } from '@agney/react-loading'
import st from 'styles/samples/confirm_icon.module.css'

export const ConfirmIcon = ({ onClick, disabled, loading }) => {
    return(
        <div className={st.confirm + (disabled ? ` ${st.disabled}` : '')} onClick={disabled ? null : onClick}>
            {
                loading ?
                <TailSpin height='15px'/>
                :
                <div className={st.symbol + (disabled ? ` ${st.disabled_symbol}` : '')}></div>
            }
        </div>
    )
}