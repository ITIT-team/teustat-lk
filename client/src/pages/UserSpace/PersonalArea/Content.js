import React, { useState } from 'react'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/content.module.css'
import { CompanyCard } from 'samples/CompanyCard'

export const Content = ({ filters }) => {
    const { userData, setUserData } = useMyContext()
    const [ selectedCards, setSelectedCards ] = useState([])

    const changeSelectedCard = (id, bool) => {
        if (bool) setSelectedCards(prev => prev.concat(id))
        else setSelectedCards(prev => prev.filter(cid => cid !== id))
    }

    return (
        <div className={st.content}>
            {
                userData.companies.map(
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
