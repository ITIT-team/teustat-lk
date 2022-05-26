import React, { useState } from 'react'
import { Heading } from './Heading'
import { Content } from './Content'
import st from 'styles/UserSpace/ClientsPage/personal_area.module.css'

export const ClientsPage = () => {
    const [filters, setFilters] = useState({
        search: '', sort: 'Дате'
    })

    const filtersHandler = e =>
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className={st.personal_area_container}>
            <Heading filters={filters} filtersHandler={filtersHandler} />
            <Content />
        </div>
    )
}
