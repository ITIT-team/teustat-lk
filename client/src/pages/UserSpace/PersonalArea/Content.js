import React from 'react'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/content.module.css'
import { CompanyCard } from 'samples/CompanyCard'

export const Content = ({ filters }) => {
    const { userData, setUserData } = useMyContext()

    return (
        <div className={st.content}>
            {
                userData.companies.map(company => <CompanyCard key={company.id} company={company}/>)
            }
        </div>
    )
}
