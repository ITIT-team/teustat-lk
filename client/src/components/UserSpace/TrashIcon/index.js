import React from 'react'
import { TailSpin } from '@agney/react-loading'
import icon from 'assets/userspace/trash_icon.svg'
import whiteIcon from 'assets/userspace/white_trash_icon.svg'
import st from 'styles/components/trash_icon.module.css'

export const TrashIcon = ({ onClick=()=>{}, loading, style, white=false }) => {
    return (
        <div style={style} className={st.trash_icon + (loading ? ` ${st.disabled}` : '')} onClick={onClick}>
            {
                loading ?
                <TailSpin height='15px'/>
                :
                <img src={white ? whiteIcon : icon} alt='icon' />
            }
        </div>
    )
}
