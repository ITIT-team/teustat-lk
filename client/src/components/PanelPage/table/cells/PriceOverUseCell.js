import React from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const PriceOverUseCell = ({ priceOverUse, currency, opened }) =>
    <td>
        <div className={c.price_over_use_cell}>
            <div>{priceOverUse !== 0 ? `${priceOverUse} ${currency}` : ''}</div>
            <div className={c.price_over_use_arrow_container}>
                <div className={c.price_over_use_arrow + (opened ? ` ${c.price_over_use_arrow_opened}` : '')}></div>
            </div>
        </div>
    </td>