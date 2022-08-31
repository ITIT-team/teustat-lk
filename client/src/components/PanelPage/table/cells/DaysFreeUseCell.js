import React from 'react'
import c from 'styles/PanelPage/Table/table.module.css'

export const DaysFreeUseCell = ({ daysFreeUse }) => 
    <td>
        <div className={c.days_free_use_cell}>
            { daysFreeUse !== 0 ? `${daysFreeUse} дн.` : '' }
        </div>
    </td>
