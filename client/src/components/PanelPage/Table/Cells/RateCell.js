import React from 'react'
import { usePanelContext } from 'Context'
import { numberSplitter } from 'utils'
import { EnvelopIcon } from 'components/Global'
import c from 'styles/PanelPage/Table/table.module.css'

export const RateCell = ({
    rate,
    rateUSD,
    currency,
    showZero=false,
    withEnvelop=true,
    onSendRequest=()=>{},
}) => {
    const { isTrial } = usePanelContext()
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
                            (showZero && !isTrial) ?
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
                            (showZero && !isTrial) ?
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
                    (withEnvelop && !isTrial) && <EnvelopIcon onClick={envelopOnClick} />
                }
            </div>
        </td>
    )
}
