import React from 'react'
import { SimpleTextInput } from 'samples/UserSpace/SimpleTextInput'
import { SimpleSelect } from 'samples/UserSpace/SimpleSelect'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

import loupeIcon from 'assets/userspace/loupe_icon.svg'

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
            {/* TODO hidden panel for marked lines */}
            {/* <div className={st.hidden_panel}>

            </div> */}
            <div className={st.heading_filters}>
                <div className={st.search}>
                    <SimpleTextInput
                        name='search'
                        placeholder='Поиск'
                        icon={loupeIcon}
                        value={filters.search}
                        onChange={filtersHandler}
                        bold
                    />
                </div>
                <div className={st.sort_by}>
                    <SimpleSelect
                        options={['Дате', 'Имени', 'Пользователям']}
                        value={filters.sort}
                        setNewValue={val => {
                            const fakeEvent = {
                                target: {
                                    name: 'sort',
                                    value: val
                                }
                            }
                            filtersHandler(fakeEvent)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
