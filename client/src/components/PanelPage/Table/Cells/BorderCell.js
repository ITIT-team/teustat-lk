import React from 'react'
import c from 'styles/PanelPage/Table/table.module.css'

export const BorderCell = ({ border }) => 
    <td>
        <div className={c.border_cell}>{border}</div>
    </td>
