import React from 'react'
import st from 'styles/UserSpace/content.module.css'
import { CompanyCard } from 'components/UserSpace/CompanyCard'

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
                    if (filters.sort === 'Дате подключения'){
                        const dateA = a.activatedChangeDate !== '' ? a.activatedChangeDate : 0
                        const dateB = b.activatedChangeDate !== '' ? b.activatedChangeDate : 0
                        return new Date(dateB) - new Date(dateA)
                    } else if (filters.sort === 'Имени'){
                        return new Intl.Collator('ru').compare(a.name, b.name)
                    } else if (filters.sort === 'Пользователям'){
                        const countA = a.employeeCount !== '' ? a.employeeCount : 0
                        const countB = b.employeeCount !== '' ? b.employeeCount : 0
                        return countB - countA
                    } else if (filters.sort === 'Дате входа'){
                        const dateA = a.lastUserActivity !== '' ? a.lastUserActivity : 0
                        const dateB = b.lastUserActivity !== '' ? b.lastUserActivity : 0
                        return new Date(dateB) - new Date(dateA)
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
