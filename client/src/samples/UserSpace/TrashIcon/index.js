import React from 'react'
import { TailSpin } from '@agney/react-loading'
import icon from 'assets/userspace/trash_icon.svg'
import st from 'styles/samples/trash_icon.module.css'

export const TrashIcon = ({ onClick, loading }) => {
    return (
        <div className={st.trash_icon + (loading ? ` ${st.disabled}` : '')} onClick={onClick}>
            {
                loading ?
                <TailSpin height='15px'/>
                :
                <img src={icon} alt='icon' />
            }
        </div>
    )
}
