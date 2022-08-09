import React, { useState } from 'react'
import { usePush, useHttp } from 'hooks'
import { SimpleTextInput } from 'components/UserSpace/SimpleTextInput'
import { SimpleSelect } from 'components/UserSpace/SimpleSelect'
import { CreateCompanyPrompt } from 'components/UserSpace/CreateCompanyPrompt'
import { TrashButton } from 'components/UserSpace/TrashButton'
import { useGlobalContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

import loupeIcon from 'assets/userspace/loupe_icon.svg'

export const Heading = ({ filters, filtersHandler, selectedCards, setSelectedCards, spaceType }) => {
    const { setUserData } = useGlobalContext()
    const [prompt, setPrompt] = useState(false)
    const { request, loading } = useHttp()
    const push = usePush()

    const removeCompaniesHandler = async () => {
        try {
            await request('/api/remove_company', { companyId: selectedCards })
            push('Компании удалены', true)
        } catch (e) {
            push(e.message)
        } finally {
            const newUserData = await request('/auth/passive_authorization')
            setUserData(newUserData)
            setSelectedCards([])
        }
    }

    return (
        <>
            <div className={st.heading}>
                <div className={st.heading_name}>
                    {spaceType === 'Клиент' && <h3>Клиенты</h3>}
                    {spaceType === 'Тестовый' && <h3>Тестовые</h3>}
                    <div className={st.heading_add_button} onClick={setPrompt.bind(this, true)}>
                        <div className={st.button_plus}>+</div>
                        <div className={st.button_text}>
                            Добавить {spaceType === 'Клиент' ? 'клиента' : 'тестового'}
                        </div>
                    </div>
                </div>
                {
                    selectedCards.length !== 0
                    &&
                    <TrashButton
                        onClick={removeCompaniesHandler}
                        loading={loading}
                    />
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
                            options={['Дате подключения', 'Дате входа', 'Имени', 'Пользователям']}
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
