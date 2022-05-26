import React from "react";
import icon from 'assets/userspace/trash_icon.svg'
import st from 'styles/samples/trash_icon.module.css'

export const TrashIcon = ({ onClick }) => {
    return (
        <div className={st.trash_icon} onClick={onClick}>
            <img src={icon} alt='icon' />
        </div>
    )
}
