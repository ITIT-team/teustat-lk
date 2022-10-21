import React from 'react'
import { numberSplitter } from 'utils'
import { EnvelopIcon } from 'components/Global/EnvelopIcon'
import c from 'styles/PanelPage/Table/table.module.css'

export const RateCell = ({
    rate,
    rateUSD,
    currency,
    showZero=false,
    withEnvelop=true,
    onSendRequest=()=>{},
}) => {
    const envelopOnClick = e => {
        e.stopPropagation()
        onSendRequest()
    }
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
                {
                    withEnvelop && <EnvelopIcon onClick={envelopOnClick} />
                }
            </div>
        </td>
    )
}
