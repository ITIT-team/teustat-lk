import React from 'react'
import c from 'styles/PanelPage/Table/table.module.css'

export const DestinationDropOffCell = ({ destinationDropOff, needShowDropOff }) => 
    <td>
        <div className={c.des_drop_cell}>
            {needShowDropOff && destinationDropOff}
        </div>
    </td>
