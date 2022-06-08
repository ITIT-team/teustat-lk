import React, { useEffect, useState, useCallback } from 'react'
import { useHttp, usePush } from 'hooks'
import { RadioButton } from 'samples/UserSpace/RadioButton'
import { ToggleSwitch } from 'samples/Global/ToggleSwitch'
import { TrashIcon } from 'samples/UserSpace/TrashIcon'
import { EmpRow } from './EmpRow'
import { convertDate } from 'utils/convertDate'
import { generatePassword } from 'utils/generatePass'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/company_card.module.css'


export const CompanyCard = ({ company, selected, setSelected }) => {
    const { setUserData, showConfirm } = useMyContext()
    const [opened, setOpened] = useState(false)
    const [employees, setEmployees] = useState(null)
    const [addRows, setAddRows] = useState([])
    const { request, loading } = useHttp()
    const push = usePush()

    const deactivateCompanyHandler = async({checked}) => {
        try {
            await request('/api/change_company', {
                companyId: company.companyId,
                activated: checked
            })
            setUserData(prev => {
                prev.companies = prev.companies.map(comp => {
                    if (comp.companyId === company.companyId){
                        comp.activated = checked
                        comp.activatedChangeDate = new Date().toLocaleDateString('ru')
                    }
                    return comp
                })
                return prev
            })
            push(`Доступ ${company.name} ${checked ? 'в' : 'вы'}ключен`, true)
        } catch (e) {
            push(e.message)
        }
    }

    const deleteCompanyHandler = async (e) => {
        e.stopPropagation()
        showConfirm({
            message: `Вы уверены, что хотите удалить ${company.name}?`,
            submitFunc: async() => {
                try {
                    await request('/api/remove_company', { companyId: company.companyId })
                    const newUserData = await request('/auth/passive_authorization')
                    setUserData(newUserData)
                    push(`Компания ${company.name} удалена`, true)
                } catch (e) {
                    push(e.message)
                }
            }
        })
    }

    const loadEmployees = useCallback(async() => {
        try {
            const data = await request('/api/company_users', { companyId: company.companyId })
            setEmployees(data)
            setUserData(prev => {
                prev.companies = prev.companies.map(comp => {
                    if (comp.companyId === company.companyId){
                        comp.employeeCount = data.length
                    }
                    return comp
                })
                return prev
            })
        } catch (e) {
            push(e.message)
        }
    }, [push, request, company.companyId, setUserData])

    useEffect(() => {
        if (opened && !employees){
            loadEmployees()
        }
    }, [opened, employees, loadEmployees])

    const rowAddHandler = () => {
        setAddRows(prev => prev.concat({
            userId: generatePassword(),
            name: '',
            email: '',
            password: '',
            activated: true,
            activatedChangeDate: new Date().toLocaleDateString('ru'),
            newRow: true
        }))
    }

    return (
        <>
            <div className={st.company_card} onClick={() => setOpened(prev => !prev)}>
                <div className={st.name_section}>
                    <RadioButton checked={selected} setChecked={bool => setSelected(company.companyId, bool)} />
                    <div className={st.company_name}>{company.name}</div>
                </div>
                <div className={st.users_count}>
                    <div className={st.users_count_num}>
                        {company.employeeCount || '0'}
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
                <div className={st.last_user_activity}>
                    Вход {convertDate(company.lastUserActivity)}
                </div>
                <div className={st.icons_section}>
                    <ToggleSwitch
                        name='company_activated'
                        value={company.activated}
                        onChange={loading ? () => {} : e => deactivateCompanyHandler(e.target)}
                    />
                    <TrashIcon
                        onClick={deleteCompanyHandler}
                        loading={loading}
                    />
                    <div
                        className={st.arrow}
                        style={{ transform: opened ? 'rotateZ(135deg)' : 'rotateZ(-45deg)' }}
                    ></div>
                </div>
            </div>
            <div
                className={st.card_content}
                style={
                    (opened && employees)
                    ? 
                    { height: ((employees.length + addRows.length) * 50) + 100 }
                    :
                    { height: opened ? '50px' : '0px' }}
            >
                {
                    employees
                    ?
                    <>
                        <div className={st.content_add_user}>
                            Пользователи
                            <div
                                className={st.content_plus_icon}
                                onClick={rowAddHandler}
                            >+</div>
                        </div>
                        {
                            addRows.map(
                                row => 
                                    <EmpRow
                                        key={row.userId}
                                        employee={row}
                                        setEmployees={setAddRows}
                                        companyId={company.companyId}
                                        employeesLoader={loadEmployees}
                                        highLoading={loading}
                                    />
                            )
                        }
                        {
                            employees.map(
                                emp =>
                                    <EmpRow
                                        key={emp.userId}
                                        employee={emp}
                                        setEmployees={setEmployees}
                                        companyId={company.companyId}
                                        employeesLoader={loadEmployees}
                                        highLoading={loading}
                                    />
                            )
                        }
                    </>
                    :
                    <div style={{marginTop: 12, textAlign: 'center'}}>Загрузка...</div>
                }
            </div>
        </>
    )
}
