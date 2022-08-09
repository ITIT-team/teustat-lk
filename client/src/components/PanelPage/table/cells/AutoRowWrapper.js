import React, { useState, useEffect } from 'react'
import { useHttp } from 'hooks'
import { usePanelContext } from 'Context'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { NdsCell } from './NdsCell'
import { CommentCell } from './CommentCell'
// import { Loader } from 'components/Global/Loader'
import c from 'styles/PanelPage/table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import pdfIcon from 'assets/panel/table/pdf_icon.svg'

export const AutoRowWrapper = ({ r, id, keys }) => {
    const { setPdf } = usePanelContext()
    const [opened, setOpened] = useState(false)
    const [content, setContent] = useState(null)
    const [showContent, setShowContent] = useState(false)
    const { request } = useHttp()

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

    const loadPdf = async (id, name) => {
        try {
            const data = await request('/panel/get_pdf', { idPrice: id })
            setPdf({ name, data: data.baseContent })
        } catch (e) { console.warn(e) }
    }

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
                                departureCityCountry={r.departureCityCountry}
                                destinationCityCountry={r.destinationCityCountry}
                                key={key}
                            />
                        }
                        if (key === 'containerSize'){
                            return <ContainerSizeCell
                                size={r.containerSize}
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
                                currency={'руб.'}
                                key={key}
                            />
                        }
                        if (key === 'nds'){
                            return <NdsCell
                                customNds={r.nds}
                                key={key}
                            />
                        }
                        if (key === 'distance'){
                            return <ServiceCell
                                service={r.distance}
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
                    style={(opened && content) ? {height: `${Math.max(content.rateCondition.split('#').length * 35, 300)}px`} : {height: opened ? '50px' : '0px'}}
                >
                    {
                        showContent
                        &&
                        <div className={c.info_content}>    
                            {
                                content ?
                                <>
                                    <div className={c.info_subinfo}>
                                        <div className={c.info_condition_head}>Норма погрузки / выгрузки</div>
                                        {
                                            r.normLoading !== 0 ?
                                            `${r.normLoading} ч.`
                                            :
                                            'Не указана'
                                        }
                                        <div className={c.info_condition_head} style={{marginTop: '30px'}}>Простой:</div>
                                        {
                                            `${r.simple} руб.`
                                        }
                                    </div>
                                    <div className={c.info_subinfo}>
                                        <div className={c.info_condition_head}>Полный прайс:</div>
                                        {
                                            content.idPrice.map(price =>
                                                <div
                                                    className={c.pdf_button}
                                                    key={price.id}
                                                    onClick={() => loadPdf(price.id, price.name)}
                                                >
                                                    <div className={c.pdf_button_logo}>
                                                        <img src={pdfIcon} alt="PDF" />
                                                    </div>
                                                    <div className={c.pdf_button_text}>
                                                        <div className={c.pdf_button_name}>{price.name}.{price.type}</div>
                                                        <div className={c.pdf_button_size}>{price.size} KB</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={c.info_contacts}>
                                        <div className={c.info_contacts_phone_head}>
                                            <img src={phoneIcon} alt="Телефон"/>
                                            Телефон:
                                        </div>
                                        {
                                            content.contractor.phone.split(';').length > 1 ?
                                            content.contractor.phone.split(';').map((row, idx) => (
                                                <div
                                                    className={c.info_contacts_phone_row}
                                                    style={idx === content.contractor.phone.split(';').length - 1 ? {marginBottom: '30px'} : {}}
                                                    key={idx}
                                                >
                                                    { row !== '' ? row : 'Не указан' }
                                                </div>
                                            ))
                                            :
                                            <div className={c.info_contacts_phone_row} style={{marginBottom: '30px'}}>
                                                { content.contractor.phone !== '' ? content.contractor.phone : 'Не указан' }
                                            </div>
                                        }
                                        <div className={c.info_contacts_email_head}>
                                            <img src={emailIcon} alt="Email"/>
                                            E-mail:
                                        </div>
                                        {
                                            content.contractor.email.split(';').length > 1 ?
                                            content.contractor.email.split(';').map((row, idx) => (
                                                <div
                                                    className={c.info_contacts_phone_row}
                                                    key={idx}
                                                    style={idx === content.contractor.email.split(';').length - 1 ? {marginBottom: '30px'} : {}}
                                                >
                                                    { row !== '' ? row : 'Не указан' }
                                                </div>
                                            ))
                                            :
                                            <div className={c.info_contacts_phone_row} style={{marginBottom: '30px'}}>
                                                { content.contractor.email !== '' ? content.contractor.email : 'Не указан' }
                                            </div>
                                        }
                                    </div>
                                </>
                                :
                                <div>Загрузка...</div>
                            }
                        </div>
                    }
                </td>
            </tr>
        </>
    )
}
