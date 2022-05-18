import React from 'react'
import { SimpleTextInput } from '../../../samples/SimpleTextInput'
import st from '../../../styles/UserSpace/personal_area.module.css'

export const Heading = ({ filters, filtersHandler }) => {
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
                <SimpleTextInput
                    name='search'
                    placeholder='Поиск'
                    symbol='&#128269;'
                    value={filters.search}
                    onChange={filtersHandler}
                    bold
                />
            </div>
            
        </div>
    )
}
