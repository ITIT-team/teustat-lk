import React from 'react'
import { usePush, useHttp } from 'hooks'
import { TextInputFrame } from 'components/Global/TextInputFrame'
import { GenerateIcon } from 'components/Global/GenerateIcon'
import { ToggleSwitch } from 'components/Global/ToggleSwitch'
import { InfoIcon } from 'components/Global/InfoIcon'
import { TrashIcon } from '../TrashIcon'
import { generatePassword, convertDate } from 'utils'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/emprow.module.css'

export const EmpRow = ({
    employee,
    setEmployees,
    companyId,
    employeesLoader,
    highLoading
}) => {
    const { showConfirm } = useMyContext()
    const { request, loading } = useHttp()
    const push = usePush()

    const activatedChangeHandler = async ({ checked }) => {
        try {
            if (!employee.newRow){
                await request('/api/change_user', {
                    userId: employee.userId,
                    activated: checked
                })
                push(`Доступ ${employee.email} ${checked ? 'в' : 'вы'}ключен`, true)
            }
            setEmployees(prev => {
                prev = prev.map(emp => {
                    if (emp.userId === employee.userId){
                        emp.activated = checked
                        emp.activatedChangeDate = new Date().toISOString().split('T')[0]
                    }
                    return emp
                })
                return prev
            })
        } catch (e) {
            push(e.message)
        }
    }

    const inputChangeHandler = e => setEmployees(prev => {
        prev = prev.map(emp => {
            if (emp.userId === employee.userId){
                emp[e.target.name] = e.target.value
            }
            return emp
        })
        return prev
    })

    const employeeDeleteHandler = () => {
        showConfirm({
            message: `Вы уверены, что хотите удалить пользователя ${employee.email}?`,
            submitFunc: async () => {
                try {
                    await request('/api/remove_user', { userId: employee.userId })
                    await employeesLoader()
                    push(`Пользователь ${employee.email} удалён`, true)
                } catch (e) {
                    push(e.message)
                }
            }
        })
    }

    const rowDeleteHandler = () => {
        setEmployees(prev => prev.filter(r => r.userId !== employee.userId))
    }

    const generatePasswordHandler = async() => {
        const { email, activated } = employee
        if (email === ''){
            push('Сначала заполните email')
            return
        }
        showConfirm({
            message: `Создать пользователя ${employee.email}?`,
            submitFunc: async () => {
                const password = generatePassword()
                try {
                    await request('/api/add_user', {
                        name: '-',
                        email,
                        password,
                        companyId: companyId,
                        activated,
                        accessLevel: 1
                    })
                    setEmployees(prev => prev.filter(emp => emp.userId !== employee.userId))
                    await employeesLoader()
                    push(`Пользователь ${employee.email} создан`, true)
                } catch (e) {
                    push(e.message)
                }
            }
        })
    }

    const regeneratePasswordHandler = async() => {
        const pass = generatePassword()
        try {
            await request('/api/change_user', {
                userId: employee.userId,
                password: pass
            })
            setEmployees(prev => {
                prev = prev.map(emp => {
                    if (emp.userId === employee.userId){
                        emp.password = pass
                    }
                    return emp
                })
                return prev
            })
            push(`Пароль для ${employee.email} успешно изменён`, true)
        } catch (e) {
            push(e.message)
        }
    }

    return (
        <div className={st.emprow}>
            <div className={st.emprow_inputs}>
                <div className={st.emprow_input_block}>
                    <TextInputFrame
                        label='Логин'
                        name='email'
                        value={employee.email}
                        onChange={employee.newRow ? inputChangeHandler : () => {}}
                    />
                </div>
                <div className={st.emprow_input_block}>
                    <TextInputFrame
                        label='Пароль'
                        name='password'
                        value={employee.password}
                        onChange={() => {}}
                        icon={<GenerateIcon onClick={employee.newRow ? generatePasswordHandler : regeneratePasswordHandler}/>}
                    />
                </div>
            </div>
            <div className={st.user_info}>
                <InfoIcon />
            </div>
            <div className={st.activated_change_date}>
                { employee.activated ? 'Подключен' : 'Отключен' }
                &nbsp;
                { convertDate(employee.activatedChangeDate) }
            </div>
            <div className={st.last_activity}>
                Вход
                &nbsp;
                { convertDate(employee.lastActivity) }
            </div>
            <div className={st.utils_panel}>
                <ToggleSwitch
                    name='activated'
                    value={employee.activated}
                    onChange={loading ? () => {} : e => activatedChangeHandler(e.target)}
                />
                <TrashIcon
                    onClick={loading ? () => {} : (employee.newRow ? rowDeleteHandler : employeeDeleteHandler)}
                    loading={loading || highLoading}
                />
                <div style={{ width: 9, height: 9 }}></div>
            </div>
        </div>
    )
}
