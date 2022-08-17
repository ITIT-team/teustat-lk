import React, { useState, useEffect } from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { usePanelContext } from 'Context'
import { useHttp } from 'hooks'
import { CommentCell } from './CommentCell'
import { DateCell } from './DateCell'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { GroupageRateCell } from './GroupageRateCell'
import { ServiceCell } from './ServiceCell'
import { TypeUnitCell } from './TypeUnitCell'
import c from 'styles/PanelPage/table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import stockIcon from 'assets/panel/table/groupage/stock_icon.svg'

export const GroupageRowWrapper = ({ r, id, keys, filter }) => {
  const { records } = usePanelContext()
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showContent, setShowContent] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [marginForIntervals, setMarginForIntervals] = useState(0)
  const [oneRowCompoundMargin, setOneRowCompoundMargin] = useState(0)
  const [oneCompoundMargin, setOneCompoundMargin] = useState(0)
  const [typeUnitWidth, setTypeUnitWidth] = useState(0)
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

  useEffect(() => {
    if (isFirstRender){
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  const setIntervalsMargin = w => setMarginForIntervals(prev => prev + w)
  const setCompoundMargin = w => setOneRowCompoundMargin(prev => prev + w)
  const setOneCompMargin = w => setOneCompoundMargin(prev => prev + w)

  return (
    <>
      <tr style={{ cursor: 'pointer', userSelect: 'none' }} onClick={setOpened.bind(this, !opened)}>
        {
          keys.map(key => {
            if (key === 'date') {
              return <DateCell
                key={key}
                date={r.date}
                checkWidth={
                  isFirstRender 
                  ?
                  mg => {
                    setIntervalsMargin(mg)
                    setCompoundMargin(mg)
                  }
                  :
                  false
                }
              />
            }
            if (key === 'departureAndDestinationCity') {
              return <DepartureAndDestinationCell
                key={key}
                depCity={r.departureCity}
                desCity={r.destinationCity}
                departureCityCountry={r.departureCityCountry}
                destinationCityCountry={r.destinationCityCountry}
                checkWidth={
                  isFirstRender
                  ?
                  mg => {
                    setIntervalsMargin(mg)
                    setOneCompMargin(mg)
                  }
                  :
                  false
                }
              />
            }
            if (key === 'typeUnit') {
              return <TypeUnitCell
                key={key}
                typeUnit={r.typeUnit === 'Объем/Вес' ? filter.typeUnit : r.typeUnit}
                checkWidth={isFirstRender ? setTypeUnitWidth : false}
              />
            }
            if (key === 'rate') {
              return <GroupageRateCell
                key={key}
                rate={r.rate}
                rateUSD={r.rateUSD}
                currency={r.currency}
                betType={r.betType}
                interval={r.interval}
                showDetails
                showZero
              />
            }
            if (key === 'service') {
              return <ServiceCell
                key={key}
                service={r.service}
                logo={r.serviceLogo}
              />
            }
            return <CommentCell key={key} comments={r.condition} opened={opened} />
          })
        }
      </tr>
      <tr style={{ height: 'auto' }}>
        <td
          colSpan={Object.keys(keys).length}
          className={c.info_container}
          style={(opened && content) ? { height: `${Math.max(content.rateCondition.split('#').length * 35, 300)}px` } : { height: opened ? '50px' : '0px' }}
        >
          {
            showContent
            &&
            <>
            {
              content ?
              <>
                <div className={c.info_array_intervals} style={{marginLeft: marginForIntervals}}>
                  {
                    r.arrayInterval.length > 1
                    &&
                    r.arrayInterval.map((int, idx) =>
                    <div className={c.info_one_interval} key={idx}>
                      <TypeUnitCell
                        typeUnit={int.typeUnit}
                        style={{
                          width: typeUnitWidth
                        }}
                        asDiv
                      />
                      <GroupageRateCell
                        rate={int.rate}
                        rateUSD={int.rateUSD}
                        currency={int.currency}
                        betType={int.betType}
                        interval={int.interval}
                        roundedTop={idx === 0}
                        roundedBottom={idx === r.arrayInterval.length - 1}
                        asDiv
                      />
                    </div>
                    )
                  }
                </div>
                <div className={c.info_compound}>
                  {
                    r.compound.map((comp, indx) => {
                      const data = records.find(r => r.id === TAB_ID.GROUPAGE).recs.find(r => r.id === comp)
                      if (data){
                        return (
                          <div
                            className={c.one_compound_row}
                            key={indx}
                            style={{marginLeft: oneRowCompoundMargin - 20}}
                          >
                            <DepartureAndDestinationCell
                              depCity={data.departureCity}
                              desCity={data.destinationCity}
                              departureCityCountry={data.departureCityCountry}
                              destinationCityCountry={data.destinationCityCountry}
                              asDiv
                            />
                            <div className={c.one_compound_row_intervals}>
                              {
                                data.arrayInterval.map(
                                  (int, idx) => 
                                    <div
                                      className={c.one_compound_interval}
                                      key={idx}
                                      style={{marginLeft: oneCompoundMargin - 200}}
                                    >
                                      <TypeUnitCell
                                        typeUnit={int.typeUnit}
                                        style={{
                                          width: typeUnitWidth,
                                        }}
                                        asDiv
                                      />
                                      <GroupageRateCell
                                        rate={int.rate}
                                        rateUSD={int.rateUSD}
                                        currency={int.currency}
                                        betType={int.betType}
                                        interval={int.interval}
                                        roundedTop={idx === 0}
                                        roundedBottom={idx === data.arrayInterval.length - 1}
                                        showZero
                                        asDiv
                                      />
                                    </div>
                                )
                              }
                            </div>
                          </div>
                        )
                      } else return null
                    })
                  }
                </div>
                <div className={c.info_content}>
                  <div className={c.info_condition_section}>
                    <div className={c.info_condition_head}>Условия ставки</div>
                    {
                      content.rateCondition !== '' ?
                        content.rateCondition.split('#').map((row, i) => (
                          <div className={c.info_condition_row} key={i}>{row}</div>
                        ))
                        :
                        <div className={c.info_condition_row}>Не указаны</div>
                    }
                  </div>
                  <div className={c.info_subinfo} style={{width: '35%'}}>
                    <div className={c.info_condition_head}>Стоимость склада</div>
                    <div className={c.info_condition_row_hard}>
                      {
                        (content.infoStock.price !== '' && content.infoStock.price.length)
                        ?
                        content.infoStock.price.map((price, indx) => 
                          <div className={c.info_stock} key={indx}>
                            <div className={c.info_stock_price}>
                              <img src={stockIcon} alt='stock_icon' />
                              {price.rate}
                              &nbsp;
                              {price.currency}
                            </div>
                            <div className={c.info_stock_description}>{price.description}</div>
                          </div>
                        )
                        :
                        'Не указана'
                      }
                    </div>
                    <div className={c.info_condition_head}>Адрес склада</div>
                    <div className={c.info_condition_row_hard}>
                      {
                        content.infoStock.address !== ''
                        ?
                        content.infoStock.address
                        :
                        'Не указан'
                      }
                    </div>
                    <div className={c.info_condition_head}>Валидность</div>
                    <div className={c.info_condition_row_hard}>
                      {
                        r.validity !== ''
                        ?
                        r.validity
                        :
                        'Не указана'
                      }
                    </div>
                  </div>
                  <div className={c.info_contacts}>
                    <div className={c.info_contacts_phone_head}>
                      <img src={phoneIcon} alt="Телефон" />
                      Телефон:
                    </div>
                    {
                      content.contractor.phone.split(';').length > 1 ?
                        content.contractor.phone.split(';').map((row, idx) => (
                          <div
                            className={c.info_contacts_phone_row}
                            key={idx}
                            style={idx === content.contractor.phone.split(';').length - 1 ? { marginBottom: '30px' } : {}}
                          >
                            {row !== '' ? row : 'Не указан'}
                          </div>
                        ))
                        :
                        <div className={c.info_contacts_phone_row} style={{ marginBottom: '30px' }}>
                          {content.contractor.phone !== '' ? content.contractor.phone : 'Не указан'}
                        </div>
                    }
                    <div className={c.info_contacts_email_head}>
                      <img src={emailIcon} alt="Email" />
                      E-mail:
                    </div>
                    {
                      content.contractor.email.split(';').length > 1 ?
                        content.contractor.email.split(';').map((row, idx) => (
                          <div
                            className={c.info_contacts_phone_row}
                            key={idx}
                            style={idx === content.contractor.email.split(';').length - 1 ? { marginBottom: '30px' } : {}}
                          >
                            {row !== '' ? row : 'Не указан'}
                          </div>
                        ))
                        :
                        <div className={c.info_contacts_phone_row} style={{ marginBottom: '30px' }}>
                          {content.contractor.email !== '' ? content.contractor.email : 'Не указан'}
                        </div>
                    }
                  </div>
                </div>
              </>
              :
              <div className={c.info_content}>
                <span>Загрузка...</span>
              </div>
            }
            </>
          }
        </td>
      </tr>
    </>
  )
}
