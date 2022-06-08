import React, { useState } from 'react'
import { usePush, useHttp } from 'hooks'
import { SimpleTextInput } from 'samples/UserSpace/SimpleTextInput'
import { SimpleSelect } from 'samples/UserSpace/SimpleSelect'
import { CreateCompanyPrompt } from 'samples/UserSpace/CreateCompanyPrompt'
import { TrashIcon } from 'samples/UserSpace/TrashIcon'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

import loupeIcon from 'assets/userspace/loupe_icon.svg'

export const Heading = ({ filters, filtersHandler, selectedCards, setSelectedCards, spaceType }) => {
    const { setUserData } = useMyContext()
    const [prompt, setPrompt] = useState(false)
    const { request, loading } = useHttp()
    const push = usePush()

    const removeCompaniesHandler = async() => {
        try {
            await Promise.all(selectedCards.map(companyId => request('/api/remove_company', { companyId })))
            const newUserData = await request('/auth/passive_authorization')
            setUserData(newUserData)
            setSelectedCards([])
            push('Компании удалены', true)
        } catch (e) {
            push(e.message)
        }
    }

    return (
        <>
            <div className={st.heading}>
                <div className={st.heading_name}>
                    <h3>Клиенты</h3>
                    <div className={st.heading_add_button} onClick={setPrompt.bind(this, true)}>
                        <div className={st.button_plus}>+</div>
                        <div className={st.button_text}>Добавить клиента</div>
                    </div>
                </div>
                {
                    selectedCards.length !== 0
                    &&
                    <div className={st.hidden_panel}>
                        <TrashIcon
                            onClick={removeCompaniesHandler}
                            loading={loading}
                        />
                    </div>
                }
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
            {
                prompt
                &&
                <CreateCompanyPrompt
                    onClose={setPrompt.bind(this, false)}
                    companyType={spaceType}
                />
            }
        </>
    )
}
