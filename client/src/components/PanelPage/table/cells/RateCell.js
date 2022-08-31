import React from 'react'
import { numberSplitter } from 'utils'
import { EnvelopIcon } from 'components/Global/EnvelopIcon'
import c from 'styles/PanelPage/Table/table.module.css'

export const RateCell = ({ rate, rateUSD, currency, showZero=false, onSendRequest=()=>{} }) => {
    return (
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
                <EnvelopIcon onClick={e => {
                    e.stopPropagation()
                    onSendRequest()
                }}/>
            </div>
        </td>
    )
}
