import React, { useEffect, useState } from 'react'
import { useHttp, usePush } from 'hooks'
import { RadioButton } from 'samples/UserSpace/RadioButton'
import { ToggleSwitch } from 'samples/Global/ToggleSwitch'
import { TrashIcon } from 'samples/UserSpace/TrashIcon'
import { convertDate } from 'utils/convertDate'
import { useMyContext } from 'Context'
import st from 'styles/samples/company_card.module.css'


export const CompanyCard = ({ company, selected, setSelected }) => {
    const { setUserData, showConfirm } = useMyContext()
    const [opened, setOpened] = useState(false)
    const [employees, setEmployees] = useState(null)
    const { request, loading } = useHttp()
    const push = usePush()

    const deactivateCompanyHandler = e => {
        setUserData(prev => {
            prev.companies = prev.companies.map(c => {
                if (c.companyId === company.companyId){
                    c.activated = e.target.checked
                }
                return c
            })
            return prev
        })
    }

    const deleteCompany = id => {
        setUserData(prev => {
            prev.companies = prev.companies.filter(c => c.companyId !== id)
            return prev
        })
    }

    const deleteCompanyHandler = async (e) => {
        e.stopPropagation()
        showConfirm({
            message: `Вы уверены, что хотите удалить ${company.name}?`,
            submitFunc: deleteCompany.bind(this, company.companyId)
        })
    }

    useEffect(() => {
        (async() => {
            if (opened && !employees)
            try {
                const data = await request('/api/company_users', { companyId: company.companyId })
                setEmployees(data)
            } catch ({errors}) {
                push(errors)
            }
        })()
    }, [opened, employees, push, request, company.companyId])

    return (
        <>
            <div className={st.company_card} onClick={() => setOpened(prev => !prev)}>
                <div className={st.name_section}>
                    <RadioButton checked={selected} setChecked={bool => setSelected(company.companyId, bool)} />
                    <div className={st.company_name}>{company.name}</div>
                </div>
                <div className={st.users_count}>
                    <div className={st.users_count_num}>
                        {company.employeeCount}
                    </div>
                    &nbsp;
                    пользователей
                </div>
                <div className={st.activated_change_date}>
                    {
                        company.activated ?
                            'Подключен '
                            :
                            'Отключен '
                    }
                    {
                        convertDate(company.activatedChangeDate)
                    }
                </div>
                <div className={st.icons_section}>
                    <ToggleSwitch
                        name='company_activated'
                        value={company.activated}
                        onChange={deactivateCompanyHandler}
                    />
                    <TrashIcon onClick={deleteCompanyHandler} />
                    <div
                        className={st.arrow}
                        style={{ transform: opened ? 'rotateZ(135deg)' : 'rotateZ(-45deg)' }}
                    ></div>
                </div>
            </div>
            <div
                className={st.card_content}
                style={(opened && employees) ? { height: `${employees.length + 100}px` } : { height: opened ? '50px' : '0px' }}
            >
                {
                    employees
                    ?
                    <>
                        <div className={st.content_add_user}>
                            Пользователи
                            <div className={st.content_plus_icon}>+</div>
                        </div>
                        {
                            employees.map(emp => <span>{JSON.stringify(emp)}</span>)
                        }
                    </>
                    :
                    <div style={{marginTop: 12, textAlign: 'center'}}>Загрузка...</div>
                }
            </div>
        </>
    )
}
