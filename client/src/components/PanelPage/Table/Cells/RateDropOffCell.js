import React from 'react'
import { usePanelContext } from 'Context'
import { numberSplitter } from 'utils'
import c from 'styles/PanelPage/Table/table.module.css'

export const RateDropOffCell = ({ cityOfGiven, rateDropOff }) => {
    const { isTrial } = usePanelContext()
    return (
        <td style={cityOfGiven === '' ? { display: 'none' } : {}}>
            <div className={c.rate_drop_cell}>
                {!isTrial && `${numberSplitter(rateDropOff.toString())} USD`}
            </div>
        </td>
    )
}
