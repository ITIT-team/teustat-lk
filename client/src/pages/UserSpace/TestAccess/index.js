import React, { useState } from 'react'
import { Heading } from '../ClientsPage/Heading'
import { Content } from '../ClientsPage/Content'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

export const TestAccess = () => {
    const { userData } = useMyContext()
    const [filters, setFilters] = useState({
        search: '', sort: 'Дате подключения'
    })
    const [ selectedCards, setSelectedCards ] = useState([])

    const filtersHandler = e =>
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className={st.personal_area_container}>
            <Heading
                filters={filters}
                filtersHandler={filtersHandler}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                spaceType='Тестовый'
            />
            <Content
                filters={filters}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
                companies={userData.companies.filter(company => company.companyType !== 'Клиент')}
            />
        </div>
    )
}