import React from 'react'
import st from 'styles/UserSpace/content.module.css'
import { CompanyCard } from 'samples/UserSpace/CompanyCard'

export const Content = ({ companies, filters, selectedCards, setSelectedCards }) => {
    const changeSelectedCard = (id, bool) => {
        if (bool) setSelectedCards(prev => prev.concat(id))
        else setSelectedCards(prev => prev.filter(cid => cid !== id))
    }

    return (
        <div className={st.content}>
            {
                companies.filter(
                    c => c.name.toLowerCase().includes(filters.search.toLowerCase())
                ).sort((a, b) => {
                    if (filters.sort === 'Дате'){
                        return new Date(b.activatedChangeDate.split('.').reverse().join('-')) - new Date(a.activatedChangeDate.split('.').reverse().join('-'))
                    } else if (filters.sort === 'Имени'){
                        return new Intl.Collator('ru').compare(a.name, b.name)
                    } else if (filters.sort === 'Пользователям'){
                        const countA = a.employeeCount !== '' ? a.employeeCount : 0
                        const countB = b.employeeCount !== '' ? b.employeeCount : 0
                        return countB - countA
                    }
                    return 0
                }).map(
                    company => 
                        <CompanyCard
                            key={company.companyId}
                            company={company}
                            selected={selectedCards.includes(company.companyId)}
                            setSelected={changeSelectedCard}
                        />
                )
            }
        </div>
    )
}
