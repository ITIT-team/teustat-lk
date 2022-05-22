import React, { useState } from 'react'
import { Heading } from './Heading'
import { Content } from './Content'

export const PersonalArea = () => {
    const [filters, setFilters] = useState({
        search: '', sort: 'Дате'
    })

    const filtersHandler = e =>
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <>
            <Heading filters={filters} filtersHandler={filtersHandler} />
            <Content />
        </>
    )
}
