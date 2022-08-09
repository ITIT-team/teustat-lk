import React from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const ContainerSizeCell = ({ size }) =>
    <td>
        {
            size !== ''
            &&
            <div className={c.container_size_cell}>
                <div className={c.container_size_text}>{size === '20 фут.тяж.' ? '20 тяж.' : size}</div>
            </div>
        }
    </td>
