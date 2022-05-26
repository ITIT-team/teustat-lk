import React from 'react'
import { TextInputFrame } from 'samples/Global/TextInputFrame'
import { GenerateIcon } from 'samples/Global/GenerateIcon'
import { ToggleSwitch } from 'samples/Global/ToggleSwitch'
import { TrashIcon } from 'samples/UserSpace/TrashIcon'
import st from 'styles/UserSpace/ClientsPage/emprow.module.css'

export const EmpRow = ({ employee, employeeChanger, employeeDeleter, inputable }) => {
    const inputChangeHandler = e => employeeChanger(prev => {
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
                        icon={<GenerateIcon />}
                    />
                </div>
            </div>
            <div className={st.confirm}>Галка</div>
            <div className={st.last_activity}>
                {employee.lastActivity || '01.01.2020'}
            </div>
            <div className={st.utils_panel}>
                <ToggleSwitch
                    name='activated'
                    value={employee.activated}
                    onChange={inputChangeHandler}
                />
                <TrashIcon onClick={employeeDeleter}/>
                <div className={st.noop_or_confirm}></div>
            </div>
        </div>
    )
}
