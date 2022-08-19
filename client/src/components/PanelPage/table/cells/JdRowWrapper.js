import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp } from 'hooks'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ContainerOwnerCell } from './ContainerOwnerCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { CommentCell } from './CommentCell'
import { BorderCell } from './BorderCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'
import c from 'styles/PanelPage/table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import { NdsCell } from './NdsCell'

import { PanelLocale } from 'locales'

export const JdRowWrapper = ({ r, id, keys }) => {
    const [opened, setOpened] = useState(false)
    const [content, setContent] = useState(null)
    const [showContent, setShowContent] = useState(false)
    const { request } = useHttp()
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (opened){
            setTimeout(() => setShowContent(true), 300)
            if (!content){
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
            <tr style={{cursor: 'pointer', userSelect: 'none'}} onClick={() => setOpened(!opened)}>
                {
                    keys.map(key => {
                        if (key === 'date'){
                            return <DateCell key={key} date={r.date}/>
                        }
                        if (key === 'departureAndDestinationCity'){
                            return <DepartureAndDestinationCell
                                depCity={r.departureCity}
                                depStation={r.departureStation}
                                depTerminal={r.departureCityCountry === 'РОССИЯ' ? r.departureTerminal : null}
                                desCity={r.destinationCity}
                                desStation={r.destinationStation}
                                desTerminal={r.destinationCityCountry === 'РОССИЯ' ? r.destinationTerminal : null}
                                departureCityCountry={r.departureCityCountry}
                                destinationCityCountry={r.destinationCityCountry}
                                alwaysShowStations
                                key={key}
                                full={opened}
                            />
                        }
                        if (key === 'containerSize'){
                            return <ContainerSizeCell
                                size={r.containerSize}
                                key={key}
                            />
                        }
                        if (key === 'containerOwner'){
                            return <ContainerOwnerCell
                                containerOwner={r.containerOwner}
                                key={key}
                            />
                        }
                        if (key === 'service'){
                            return <ServiceCell
                                service={r.service}
                                logo={r.serviceLogo}
                                key={key}
                            />
                        }
                        if (key === 'rate'){
                            return <RateCell
                                rate={r.rate}
                                rateUSD={r.rateUSD}
                                currency={r.currency}
                                key={key}
                            />
                        }
                        if (key === 'nds'){
                            return <NdsCell key={key} rateType={r.rateType}/>
                        }
                        if (key === 'border'){
                            return <BorderCell
                                border={r.border}
                                key={key}
                            />
                        }
                        return <CommentCell key={key} comments={r.condition} opened={opened}/>
                    })
                }
            </tr>
            <tr style={{height: 'auto'}}>
                <td
                    colSpan={Object.keys(keys).length}
                    className={c.info_container}
                    style={(opened && content) ? {height: `${Math.max(content.rateCondition.split('#').length * 35, 300)}px`, paddingBottom: 70} : {height: opened ? '50px' : '0px'}}
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
                                        <div className={c.info_condition_head}>{PanelLocale['количество_отправлений_в_неделю'][locale]}:</div>
                                        <div className={c.info_condition_row_hard}>
                                            {
                                                r.quantityDeparture !== 0 ?
                                                r.quantityDeparture
                                                :
                                                PanelLocale['не_указано'][locale]
                                            }
                                        </div>
                                        <div className={c.info_condition_head}>{PanelLocale['срок_ожидания'][locale]}:</div>
                                        <div className={c.info_condition_row_hard}>
                                            {
                                                r.waitingTime !== '' ?
                                                r.waitingTime
                                                :
                                                PanelLocale['не_указано'][locale]
                                            }
                                        </div>
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
                                            <img src={phoneIcon} alt="Телефон"/>
                                            {PanelLocale['телефон'][locale]}:
                                        </div>
                                        {
                                            content.contractor.phone.split(';').length > 1 ?
                                            content.contractor.phone.split(';').map((row, idx) => (
                                                <div
                                                    className={c.info_contacts_phone_row}
                                                    key={idx}
                                                    style={idx === content.contractor.phone.split(';').length - 1 ? {marginBottom: '30px'} : {}}
                                                >
                                                    { row !== '' ? row : PanelLocale['не_указано'][locale] }
                                                </div>
                                            ))
                                            :
                                            <div className={c.info_contacts_phone_row} style={{marginBottom: '30px'}}>
                                                { content.contractor.phone !== '' ? content.contractor.phone : PanelLocale['не_указано'][locale] }
                                            </div>
                                        }
                                        <div className={c.info_contacts_email_head}>
                                            <img src={emailIcon} alt="Email"/>
                                            {PanelLocale['email'][locale]}:
                                        </div>
                                        {
                                            content.contractor.email.split(';').length > 1 ?
                                            content.contractor.email.split(';').map((row, idx) => (
                                                <div
                                                    className={c.info_contacts_phone_row}
                                                    key={idx}
                                                    style={idx === content.contractor.email.split(';').length - 1 ? {marginBottom: '30px'} : {}}
                                                >
                                                    { row !== '' ? row : PanelLocale['не_указано'][locale] }
                                                </div>
                                            ))
                                            :
                                            <div className={c.info_contacts_phone_row} style={{marginBottom: '30px'}}>
                                                { content.contractor.email !== '' ? content.contractor.email : PanelLocale['не_указано'][locale] }
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