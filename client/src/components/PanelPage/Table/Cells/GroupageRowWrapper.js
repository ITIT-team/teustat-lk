import React, { useState, useEffect } from 'react'
import { usePanelContext, useGlobalContext } from 'Context'
import { TAB_ID } from 'constants/PanelConstants'
import { useHttp, usePush } from 'hooks'
import { CommentCell } from './CommentCell'
import { DateCell } from './DateCell'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { GroupageRateCell } from './GroupageRateCell'
import { ServiceCell } from './ServiceCell'
import { TypeUnitCell } from './TypeUnitCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'
import c from 'styles/PanelPage/Table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import stockIcon from 'assets/panel/table/groupage/stock_icon.svg'

import { PanelLocale } from 'locales'
import { ContactList } from 'components/PanelPage/ContactList'

export const GroupageRowWrapper = ({
  handleContact,
  openCard,
  r,
  id,
  keys,
  filter,
}) => {
  const { records, setRequestPromptData, isTrial } = usePanelContext()
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showContent, setShowContent] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [marginForIntervals, setMarginForIntervals] = useState(0)
  const [oneRowCompoundMargin, setOneRowCompoundMargin] = useState(0)
  const [oneCompoundMargin, setOneCompoundMargin] = useState(0)
  const [typeUnitWidth, setTypeUnitWidth] = useState(0)
  const { request } = useHttp()
  const push = usePush()
  const { locale } = useGlobalContext()
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)

  const handleCopyContact = (type, data) => {
    if (type === 'phone') {
      handleContact({ event: 'copy_phone', data })
    }
    if (type === 'email') {
      handleContact({ event: 'copy_email', data })
    }
  }

  const handleShowContact = (event) => {
    if (!showPhone && event.event === 'click_phone') {
      handleContact(event)
      setShowPhone(true)
    }
    if (!showEmail && event.event === 'click_email') {
      handleContact(event)
      setShowEmail(true)
    }
  }

  const handleOpenCard = () => {
    if (!opened) {
      openCard()
    }
  }

  useEffect(() => {
    if (opened) {
      setTimeout(() => setShowContent(true), 300)
      if (!content) {
        request(`/${isTrial ? 'trial' : 'panel'}/get_rate_details`, {
          rateId: id,
          language: locale,
        })
          .then(data => setContent(data))
          .catch(err => push({ messages: err.message, err }))
      }
    } else {
      setShowContent(false)
    }
  }, [opened, content, id, request, locale, push, isTrial])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  const setIntervalsMargin = (w) => setMarginForIntervals((prev) => prev + w)
  const setCompoundMargin = (w) => setOneRowCompoundMargin((prev) => prev + w)
  const setOneCompMargin = (w) => setOneCompoundMargin((prev) => prev + w)

  return (
    <>
      <tr
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClickCapture={handleOpenCard}
        onClick={setOpened.bind(this, !opened)}
      >
        {keys.map((key) => {
          if (key === 'date') {
            return (
              <DateCell
                key={key}
                date={r.date}
                checkWidth={
                  isFirstRender
                    ? (mg) => {
                        setIntervalsMargin(mg)
                        setCompoundMargin(mg)
                      }
                    : false
                }
              />
            )
          }
          if (key === 'departureAndDestinationCity') {
            return (
              <DepartureAndDestinationCell
                key={key}
                depCity={r.departureCity}
                desCity={r.destinationCity}
                departureCityCountry={r.departureCityCountry}
                destinationCityCountry={r.destinationCityCountry}
                checkWidth={
                  isFirstRender
                    ? (mg) => {
                        setIntervalsMargin(mg)
                        setOneCompMargin(mg)
                      }
                    : false
                }
              />
            )
          }
          if (key === 'typeUnit') {
            return (
              <TypeUnitCell
                key={key}
                typeUnit={
                  r.typeUnit === PanelLocale['объем/вес'][locale]
                    ? filter.typeUnit
                    : r.typeUnit
                }
                checkWidth={isFirstRender ? setTypeUnitWidth : false}
              />
            )
          }
          if (key === 'rate') {
            return (
              <GroupageRateCell
                key={key}
                rate={r.rate}
                rateUSD={r.rateUSD}
                currency={r.currency}
                betType={r.betType}
                interval={r.interval}
                onSendRequest={setRequestPromptData.bind(
                  this,
                  Object.assign(r, { isGroupage: true })
                )}
                withEnvelop={r.commonList}
                showDetails
                showZero
              />
            )
          }
          if (key === 'service') {
            return (
              <ServiceCell key={key} service={r.service} logo={r.serviceLogo} />
            )
          }
          return (
            <CommentCell key={key} comments={r.condition} opened={opened} />
          )
        })}
      </tr>
      <tr style={{ height: 'auto' }}>
        <td
          colSpan={Object.keys(keys).length}
          className={c.info_container}
          style={
            opened && content
              ? {
                  height: `${Math.max(
                    content.rateCondition.split('#').length * 35,
                    300
                  )}px`,
                  paddingBottom: 70,
                }
              : { height: opened ? '50px' : '0px' }
          }
        >
          {showContent && (
            <>
              {content ? (
                <>
                  <div
                    className={c.info_array_intervals}
                    style={{ marginLeft: marginForIntervals }}
                  >
                    {r.arrayInterval.length > 1 &&
                      r.arrayInterval.map((int, idx) => (
                        <div className={c.info_one_interval} key={idx}>
                          <TypeUnitCell
                            typeUnit={
                              PanelLocale[int.typeUnit.toLowerCase()][locale]
                            }
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
                            roundedBottom={idx === r.arrayInterval.length - 1}
                            withEnvelop
                            onSendRequest={() => {
                              let mainObj = JSON.parse(JSON.stringify(r))
                              mainObj['isGroupage'] = true
                              mainObj.rate = int.rate
                              mainObj.rateUSD = int.rateUSD
                              mainObj.currency = int.currency
                              mainObj.typeUnit = int.typeUnit
                              mainObj.interval = int.interval
                              setRequestPromptData(mainObj)
                            }}
                            asDiv
                          />
                        </div>
                      ))}
                  </div>
                  <div className={c.info_compound}>
                    {r.compound.map((comp, indx) => {
                      const data = records
                        .find((r) => r.id === TAB_ID.GROUPAGE)
                        .recs.find((r) => r.id === comp)
                      if (data) {
                        return (
                          <div
                            className={c.one_compound_row}
                            key={indx}
                            style={{ marginLeft: oneRowCompoundMargin - 20 }}
                          >
                            <DepartureAndDestinationCell
                              depCity={data.departureCity}
                              desCity={data.destinationCity}
                              departureCityCountry={data.departureCityCountry}
                              destinationCityCountry={
                                data.destinationCityCountry
                              }
                              asDiv
                            />
                            <div className={c.one_compound_row_intervals}>
                              {data.arrayInterval.map((int, idx) => (
                                <div
                                  className={c.one_compound_interval}
                                  key={idx}
                                  style={{
                                    marginLeft: oneCompoundMargin - 200,
                                  }}
                                >
                                  <TypeUnitCell
                                    typeUnit={
                                      PanelLocale[int.typeUnit.toLowerCase()][
                                        locale
                                      ]
                                    }
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
                                    roundedBottom={
                                      idx === data.arrayInterval.length - 1
                                    }
                                    withEnvelop
                                    onSendRequest={() => {
                                      let mainObj = JSON.parse(
                                        JSON.stringify(data)
                                      )
                                      mainObj['isGroupage'] = true
                                      mainObj.rate = int.rate
                                      mainObj.rateUSD = int.rateUSD
                                      mainObj.currency = int.currency
                                      mainObj.typeUnit = int.typeUnit
                                      mainObj.interval = int.interval
                                      setRequestPromptData(mainObj)
                                    }}
                                    showZero
                                    asDiv
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      } else return null
                    })}
                  </div>
                  <div className={c.info_content}>
                    <div className={c.info_condition_section}>
                      <div className={c.info_condition_head}>
                        {PanelLocale['условия_ставки'][locale]}
                      </div>
                      {content.rateCondition !== '' ? (
                        content.rateCondition.split('#').map((row, i) => (
                          <div className={c.info_condition_row} key={i}>
                            {row}
                          </div>
                        ))
                      ) : (
                        <div className={c.info_condition_row}>
                          {PanelLocale['не_указано'][locale]}
                        </div>
                      )}
                    </div>
                    <div className={c.info_subinfo} style={{ width: '35%' }}>
                      <div className={c.info_condition_head}>
                        {PanelLocale['стоимость_склада'][locale]}
                      </div>
                      <div className={c.info_condition_row_hard}>
                        {content.infoStock.price !== '' &&
                        content.infoStock.price.length
                          ? content.infoStock.price.map((price, indx) => (
                              <div className={c.info_stock} key={indx}>
                                <div className={c.info_stock_price}>
                                  <img src={stockIcon} alt="stock_icon" />
                                  {price.rate}
                                  &nbsp;
                                  {price.currency}
                                </div>
                                <div className={c.info_stock_description}>
                                  {price.description}
                                </div>
                              </div>
                            ))
                          : PanelLocale['не_указано'][locale]}
                      </div>
                      <div className={c.info_condition_head}>
                        {PanelLocale['адрес_склада'][locale]}
                      </div>
                      <div className={c.info_condition_row_hard}>
                        {content.infoStock.address !== ''
                          ? content.infoStock.address
                          : PanelLocale['не_указано'][locale]}
                      </div>
                      <div className={c.info_condition_head}>
                        {PanelLocale['валидность'][locale]}:
                      </div>
                      <div className={c.info_condition_row_hard}>
                        {r.validity !== ''
                          ? r.validity
                          : PanelLocale['не_указано'][locale]}
                      </div>
                    </div>
                    <div
                      className={c.info_contacts}
                      style={{ marginBottom: 10 }}
                    >
                      {content.contractor.phone ? (
                        <div style={{ marginBottom: 7, width: 290 }}>
                          <ContactList
                            handleClick={() =>
                              handleShowContact({
                                event: 'click_phone',
                                data: content.contractor,
                              })
                            }
                            contacts={content.contractor.phone.split(';')}
                            copyContact={(contact) =>
                              handleCopyContact('phone', {
                                ...content.contractor,
                                showContact: contact,
                              })
                            }
                            contactIcon={phoneIcon}
                            contactTitle={
                              PanelLocale['показать_телефон'][locale]
                            }
                          />
                        </div>
                      ) : (
                        ''
                      )}
                      {content.contractor.email ? (
                        <div style={{ width: 290 }}>
                          <ContactList
                            handleClick={() =>
                              handleShowContact({
                                event: 'click_email',
                                data: content.contractor,
                              })
                            }
                            contacts={content.contractor.email.split(';')}
                            copyContact={(contact) =>
                              handleCopyContact('email', {
                                ...content.contractor,
                                showContact: contact,
                              })
                            }
                            contactIcon={emailIcon}
                            contactTitle={PanelLocale['показать_почту'][locale]}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <EnvelopButton
                    onClick={setRequestPromptData.bind(
                      this,
                      Object.assign(r, { isGroupage: true })
                    )}
                  />
                </>
              ) : (
                <div className={c.info_content}>
                  <span>{PanelLocale['загрузка'][locale]}...</span>
                </div>
              )}
            </>
          )}
        </td>
      </tr>
    </>
  )
}
