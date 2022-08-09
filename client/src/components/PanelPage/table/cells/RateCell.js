import React from 'react'
import { numberSplitter } from 'utils'
import c from 'styles/PanelPage/table/table.module.css'

export const RateCell = ({ rate, rateUSD, currency, showZero=false }) => 
    <td>
        <div className={c.rate_cell}>
            {
                currency === 'USD' ?
                <>
                    {
                        showZero ?
                        `${numberSplitter(rateUSD.toString())} ${currency}`
                        :
                        <>
                            {
                                rateUSD !== 0 && `${numberSplitter(rateUSD.toString())} ${currency}`
                            }
                        </>
                    }
                </>
                :
                <>
                    {
                        showZero ?
                        `${numberSplitter(rate.toString())} ${currency}`
                        :
                        <>
                            {
                                rate !== 0 && `${numberSplitter(rate.toString())} ${currency}`
                            }
                        </>
                    }
                </>
            }
        </div>
    </td>