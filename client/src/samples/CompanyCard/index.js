import React from "react";
import { RadioButton } from "samples/RadioButton";
import { ToggleSwitch } from "samples/ToggleSwitch";
import { TrashIcon } from "samples/TrashIcon";
import st from 'styles/samples/company_card.module.css'
import { convertDate } from 'utils/convertDate'


export const CompanyCard = ({ company }) => {
    return (
        <div className={st.company_card}>
            <div className={st.name_section}>
                <RadioButton checked={false} setChecked={() => { }} />
                <div className={st.company_name}>{company.name}</div>
            </div>
            <div className={st.users_count}>
                <div className={st.users_count_num}>
                    {company.employeeCount}
                </div>
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
                    name='company_activate'
                    value={company.activated}
                />
                <TrashIcon />
                <div className={st.arrow}></div>
            </div>
        </div>
    )
}
