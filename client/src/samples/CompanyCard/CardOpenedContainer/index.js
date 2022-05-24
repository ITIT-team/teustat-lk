import React, { useState } from "react";
import { AddIcon } from "samples/AddIcon";
import { CardInput } from "../CardInput";
import { ToggleSwitch } from "samples/ToggleSwitch";
import { TrashIcon } from "samples/TrashIcon";
import { convertDate } from "utils/convertDate";
import st from 'styles/samples/card_opened_container.module.css'


export const CardOpenedContainer = ({ company }) => {

    const [userForm, setUserForm] = useState({ user: '', email: '', password: '' })
    const userChangeHandler = e => setUserForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    return (
        <div className={st.container}>
            <div className={st.container_head}>
                <label className={st.users_text}>Пользователи</label>
                <AddIcon />
            </div>

            <div className={st.container_body}>
                <div className={st.body_inputs}>
                    <CardInput
                        value={userForm.user}
                        userChangeHandler={userChangeHandler}
                        name='user'
                        text='Имя'
                        placeholder='Введите имя'
                    />

                    <CardInput
                        value={userForm.email}
                        userChangeHandler={userChangeHandler}
                        name='email'
                        text='Логин'
                        placeholder='Введите логин'
                    />
                    
                    <CardInput
                        value={userForm.password}
                        userChangeHandler={userChangeHandler}
                        name='password'
                        text='Пароль'
                        placeholder='Введите пароль'
                        isPassword={true}
                    />

                </div>

                <div className={st.body_date}>{convertDate(company.activatedChangeDate)}</div>

                <div className={st.body_icons}>
                    <ToggleSwitch />
                    <TrashIcon />
                    <div></div>
                </div>
            </div>
        </div>
    )
}
