import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp } from 'hooks'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { CommentCell } from './CommentCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'
import c from 'styles/PanelPage/table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import { ContainerOwnerCell } from './ContainerOwnerCell'

import { PanelLocale, CitiesLocale } from 'locales'

export const CrossRowWrapper = ({ r, id, keys }) => {
    const [opened, setOpened] = useState(false)
    const [content, setContent] = useState(null)
    const [showContent, setShowContent] = useState(false)
    const { request } = useHttp()
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (opened) {
            setTimeout(() => setShowContent(true), 300)
            if (!content) {
                request(
                    '/panel/get_rate_details',
                    { rateId: id, language: locale }
                ).then(data => setContent(data)).catch(e => console.warn(e))
            }
        } else {
            setShowContent(false)
        }
    }, [opened, content, id, request, locale])

    return (
        <>
            <tr style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setOpened(!opened)}>
                {
                    keys.map(key => {
                        if (key === 'date') {
                            return <DateCell key={key} date={r.date} />
                        }
                        if (key === 'departureAndDestinationCity') {
                            return <DepartureAndDestinationCell
                                depCity={r.departureCity}
                                desCity={r.destinationCity}
                                middleTerminal={(() => {
                                    const rusDeparture = r.departureCityСountry === 'РОССИЯ'
                                    const rusDestination = r.destinationCityCountry === 'РОССИЯ'
                                    if ((!rusDeparture && rusDestination) || (rusDeparture && !rusDestination)) return r.terminal
                                    return null
                                })()}
                                depStation={r.departureCityCountry === 'РОССИЯ' ? r.departureStation : null}
                                desStation={(() => {
                                    const rusDeparture = r.departureCityCountry === 'РОССИЯ'
                                    const rusDestination = r.destinationCityCountry === 'РОССИЯ'
                                    if ((rusDeparture && rusDestination) || !rusDestination) return null
                                    return r.destinationStation
                                })()}
                                desTerminal={(() => {
                                    const depCityInRussia = r.departureCityCountry === 'РОССИЯ'
                                    const desCityInRussia = r.destinationCityCountry === 'РОССИЯ'
                                    if (depCityInRussia && desCityInRussia) {
                                        if (
                                            r.destinationCity === CitiesLocale['петропавловск_камчатский'][locale] ||
                                            r.destinationCity === CitiesLocale['магадан'][locale] ||
                                            r.destinationCity === CitiesLocale['корсаков'][locale]
                                        ) {
                                            return r.terminal
                                        }
                                    }
                                    return null
                                })()}
                                departureCityCountry={r.departureCityCountry}
                                destinationCityCountry={r.destinationCityCountry}
                                key={key}
                                full={opened}
                            />
                        }
                        if (key === 'containerSize') {
                            return <ContainerSizeCell
                                size={r.containerSize}
                                key={key}
                            />
                        }
                        if (key === 'containerOwner') {
                            return <ContainerOwnerCell
                                containerOwner={r.containerOwner}
                                key={key}
                            />
                        }
                        if (key === 'rate') {
                            return <RateCell
                                rate={r.rate}
                                rateUSD={r.rateUSD}
                                currency={r.currency}
                                key={key}
                            />
                        }
                        if (key === 'service') {
                            return <ServiceCell
                                service={r.betType === 'Интермодал' ? `${r.service} + ${r.terminal}` : r.service}
                                logo={r.serviceLogo}
                                key={key}
                            />
                        }
                        return <CommentCell comments={r.condition} opened={opened} key={key} />
                    })
                }
            </tr>
            <tr style={{ height: 'auto' }}>
                <td
                    colSpan={Object.keys(keys).length}
                    className={c.info_container}
                    style={(opened && content) ? { height: `${Math.max(content.rateCondition.split('#').length * 35, 300)}px`, paddingBottom: 70 } : { height: opened ? '50px' : '0px' }}
                >
                    {
                        showContent
                        &&
                        <div className={c.info_content}>
                            {
                                content ?
                                    <>
                                        <div className={c.info_condition_section}>
                                            <div className={c.info_condition_head}>{PanelLocale['условия_ставки'][locale]}</div>
                                            {
                                                content.rateCondition !== '' ?
                                                    content.rateCondition.split('#').map((row, i) => (
                                                        <div className={c.info_condition_row} key={i}>{row}</div>
                                                    ))
                                                    :
                                                    <div className={c.info_condition_row}>{PanelLocale['не_указано'][locale]}</div>
                                            }
                                        </div>
                                        <div className={c.info_subinfo}>
                                            <div className={c.info_condition_head}>{PanelLocale['валидность'][locale]}:</div>
                                            <div className={c.info_condition_row_hard}>
                                                {
                                                    r.validity !== '' ?
                                                        r.validity
                                                        :
                                                        PanelLocale['не_указано'][locale]
                                                }
                                            </div>
                                        </div>
                                        <div className={c.info_contacts}>
                                            <div className={c.info_contacts_phone_head}>
                                                <img src={phoneIcon} alt="Телефон" />
                                                {PanelLocale['телефон'][locale]}:
                                            </div>
                                            {
                                                content.contractor.phone.split(';').length > 1 ?
                                                    content.contractor.phone.split(';').map((row, idx) => (
                                                        <div
                                                            className={c.info_contacts_phone_row}
                                                            key={idx}
                                                            style={idx === content.contractor.phone.split(';').length - 1 ? { marginBottom: '30px' } : {}}
                                                        >
                                                            {row !== '' ? row : PanelLocale['не_указано'][locale]}
                                                        </div>
                                                    ))
                                                    :
                                                    <div className={c.info_contacts_phone_row} style={{ marginBottom: '30px' }}>
                                                        {content.contractor.phone !== '' ? content.contractor.phone : PanelLocale['не_указано'][locale]}
                                                    </div>
                                            }
                                            <div className={c.info_contacts_email_head}>
                                                <img src={emailIcon} alt="Email" />
                                                {PanelLocale['email'][locale]}:
                                            </div>
                                            {
                                                content.contractor.email.split(';').length > 1 ?
                                                    content.contractor.email.split(';').map((row, idx) => (
                                                        <div
                                                            className={c.info_contacts_phone_row}
                                                            key={idx}
                                                            style={idx === content.contractor.email.split(';').length - 1 ? { marginBottom: '30px' } : {}}
                                                        >
                                                            {row !== '' ? row : PanelLocale['не_указано'][locale]}
                                                        </div>
                                                    ))
                                                    :
                                                    <div className={c.info_contacts_phone_row} style={{ marginBottom: '30px' }}>
                                                        {content.contractor.email !== '' ? content.contractor.email : PanelLocale['не_указано'][locale]}
                                                    </div>
                                            }
                                        </div>
                                        <EnvelopButton />
                                    </>
                                    :
                                    <span>{PanelLocale['загрузка'][locale]}...</span>
                            }
                        </div>
                    }
                </td>
            </tr>
        </>
    )
}