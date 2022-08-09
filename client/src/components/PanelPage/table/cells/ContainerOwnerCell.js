import React from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const ContainerOwnerCell = ({ containerOwner }) => 
    <td>
        {
            containerOwner !== ''
            &&
            <div className={c.container_owner_cell}>
                <div 
                    data-prompt-text={containerOwner === 'COC' ? 'Контейнер перевозчика' : 'Контейнер заказчика'}
                    className={c.container_owner_text}
                    >
                        {containerOwner}
                    </div>
            </div>
        }
    </td>