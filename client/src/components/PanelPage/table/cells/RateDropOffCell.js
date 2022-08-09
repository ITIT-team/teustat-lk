import React from 'react'
import { numberSplitter } from 'utils'
import c from 'styles/PanelPage/table/table.module.css'

export const RateDropOffCell = ({ cityOfGiven, rateDropOff }) =>
    <td style={cityOfGiven === '' ? {display: 'none'} : {}}>
        <div className={c.rate_drop_cell}>
            {numberSplitter(rateDropOff.toString())} USD
        </div>
    </td>