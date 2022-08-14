import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp } from 'hooks'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { DestinationDropOffCell } from './DestinationDropOffCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ContainerOwnerCell } from './ContainerOwnerCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { RateDropOffCell } from './RateDropOffCell'
import { CommentCell } from './CommentCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'
import c from 'styles/PanelPage/table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'

import { PanelLocale } from 'locales'

export const FraxtRowWrapper = ({ r, filter, id, keys }) => {
    const [opened, setOpened] = useState(false)
    const [content, setContent] = useState(null)
    const [showContent, setShowContent] = useState(false)
    const { request } = useHttp()
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (opened){
            setTimeout(() => setShowContent(true), 300)
            if (!content){
                request('/panel/get_rate_details', { rateId: id }).then(data => setContent(data)).catch(e => console.warn(e))
            }
        } else {
            setShowContent(false)
        }
    }, [opened, content, id, request])

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
                                desCity={r.destinationCity}
                                depTerminal={r.departureCityCountry === 'РОССИЯ' ? r.departureTerminal : null}
                                desTerminal={r.destinationCityCountry === 'РОССИЯ' ? r.destinationTerminal : null}
                                key={key}
                                full={opened}
                                departureCityCountry={r.departureCityCountry}
                                destinationCityCountry={r.destinationCityCountry}
                                alwaysShowTerminals
                            />
                        }
                        if (key === 'destinationDropOff'){
                            return <DestinationDropOffCell
                                destinationDropOff={r.destinationDropOff}
                                needShowDropOff={filter.cityOfGiven !== ''}
                                key={key}
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
                        if (key === 'rateDropOff'){
                            return <RateDropOffCell
                                cityOfGiven={filter.cityOfGiven}
                                rateDropOff={r.rateDropOff}
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
                                        <div className={c.info_condition_head}>{PanelLocale['валидность'][locale]}:</div>
                                        {
                                            r.validity !== '' ?
                                            r.validity
                                            :
                                            PanelLocale['не_указано'][locale]
                                        }
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
                                                    style={idx === content.contractor.phone.split(';').length - 1 ? {marginBottom: '30px'} : {}}
                                                    key={idx}
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
                                <div>{PanelLocale['загрузка'][locale]}...</div>
                            }
                        </div>
                    }
                </td>
            </tr>
        </>
    )
}