import React from 'react'
import st from '../../../styles/UserSpace/personal_area.module.css'

export const Heading = () => {
    return (
        <div className={st.heading}>
            <div className={st.heading_name}>
                <h3>Клиенты</h3>
                <div className={st.heading_add_button}>
                    <div className={st.button_plus}>+</div>
                    <div className={st.button_text}>Добавить клиента</div>
                </div>
            </div>
            <div className={st.heading_filters}>
                <input type='text' />
            </div>
        </div>
    )
}
