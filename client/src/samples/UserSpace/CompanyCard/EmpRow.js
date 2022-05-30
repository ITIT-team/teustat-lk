import React from 'react'
import { usePush, useHttp } from 'hooks'
import { TextInputFrame } from 'samples/Global/TextInputFrame'
import { GenerateIcon } from 'samples/Global/GenerateIcon'
import { ToggleSwitch } from 'samples/Global/ToggleSwitch'
import { TrashIcon } from '../TrashIcon'
import { ConfirmIcon } from '../ConfirmIcon'
import { generatePassword } from 'utils/generatePass'
import { useMyContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/emprow.module.css'

export const EmpRow = ({
    employee,
    dump,
    setEmployees,
    setDump=()=>{},
    companyId,
    employeesLoader,
    highLoading
}) => {
    const { showConfirm, setUserData } = useMyContext()
    const { request, loading } = useHttp()
    const push = usePush()

    const inputChangeHandler = e => setEmployees(prev => {
        prev = prev.map(emp => {
            if (emp.userId === employee.userId){
                if (e.target.name === 'activated'){
                    emp[e.target.name] = e.target.checked
                } else {
                    emp[e.target.name] = e.target.value
                }
            }
            return emp
        })
        return prev
    })

    const employeeChangeHandler = async() => {
        try {
            await request('/api/change_user', employee)
            push('Пользователь успешно изменён', true)
            setDump(prev => prev.map(t => {
                if (t.userId === employee.userId) return JSON.parse(JSON.stringify(employee))
                return t
            }))
        } catch (e) {
            push(e.message)
        }
    }

    const employeeAddHandler = async() => {
        const { name, email, password, activated } = employee
        if (name === ''){
            push('Имя не может быть пустым')
            return
        }
        if (email === ''){
            push('Email не может быть пустым')
            return
        }
        if (password === ''){
            push('Пароль не может быть пустым')
            return
        }
        try {
            await request('/api/add_user', {
                name,
                email,
                password,
                companyId: companyId,
                activated,
                accessLevel: 1
            })
            setEmployees(prev => prev.filter(r => r.userId !== employee.userId))
            setUserData(prev => {
                prev.companies = prev.companies.map(c => {
                    if (c.companyId === companyId){
                        c.employeeCount = c.employeeCount + 1
                    }
                    return c
                })
                return prev
            })
            employeesLoader()
            push('Пользователь добавлен', true)
        } catch (e) {
            push(e.message)
        }
    }

    const employeeDeleteHandler = () => {
        showConfirm({
            message: `Вы уверены, что хотите удалить пользователя ${employee.name}?`,
            submitFunc: async () => {
                try {
                    await request('/api/remove_user', { userId: employee.userId })
                    setEmployees(prev => prev.filter(emp => emp.userId !== employee.userId))
                    setDump(prev => prev.filter(emp => emp.userId !== employee.userId))
                    setUserData(prev => {
                        prev.companies = prev.companies.map(c => {
                            if (c.companyId === companyId){
                                c.employeeCount = c.employeeCount - 1
                            }
                            return c
                        })
                        return prev
                    })
                    push(`Пользователь ${employee.name} удалён`, true)
                } catch (e) {
                    push(e.message)
                }
            }
        })
    }

    const rowDeleteHandler = () => {
        setEmployees(prev => prev.filter(r => r.userId !== employee.userId))
    }

    const generatePasswordHandler = () => {
        const pass = generatePassword()
        setEmployees(prev => {
            prev = prev.map(emp => {
                if (emp.userId === employee.userId){
                    emp.password = pass
                }
                return emp
            })
            return prev
        })
    }

    const disabledConfirmChecker = () => {
        if (dump){
            for (let key in employee){
                if (employee[key] !== dump[key]) return false
            }
            return true
        } else return false
    }

    return (
        <div className={st.emprow}>
            <div className={st.emprow_inputs}>
                <div className={st.emprow_input_block}>
                    <TextInputFrame
                        label='Имя'
                        name='name'
                        value={employee.name}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className={st.emprow_input_block}>
                    <TextInputFrame
                        label='Логин'
                        name='email'
                        value={employee.email}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className={st.emprow_input_block}>
                    <TextInputFrame
                        label='Пароль'
                        name='password'
                        value={employee.password}
                        onChange={inputChangeHandler}
                        icon={<GenerateIcon onClick={generatePasswordHandler}/>}
                    />
                </div>
            </div>
            <ConfirmIcon
                onClick={employee.newRow ? employeeAddHandler : employeeChangeHandler}
                disabled={disabledConfirmChecker() || loading || highLoading}
                loading={loading || highLoading}
            />
            <div className={st.last_activity}>
                { employee.lastActivity || 'Не указано'}
            </div>
            <div className={st.utils_panel}>
                <ToggleSwitch
                    name='activated'
                    value={employee.activated}
                    onChange={inputChangeHandler}
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
