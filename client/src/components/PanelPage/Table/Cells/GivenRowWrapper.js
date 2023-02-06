import React, { useState, useEffect } from 'react'
import { useGlobalContext, usePanelContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import c from 'styles/PanelPage/Table/table.module.css'
import { DaysFreeUseCell } from './DaysFreeUseCell'
import { PriceOverUseCell } from './PriceOverUseCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'

import { PanelLocale } from 'locales'

export const GivenRowWrapper = ({ handleContact, openCard, r, id, keys }) => {
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showContent, setShowContent] = useState(false)
  const { request } = useHttp()
  const push = usePush()
  const { locale } = useGlobalContext()
  const { setRequestPromptData, isTrial } = usePanelContext()
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)

  const handleShowContact = (event) => {
    if (!showPhone && event.event === 'click-phone') {
      handleContact(event)
      setShowPhone(true)
    }
    if (!showEmail && event.event === 'click-email') {
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
          .then((data) => setContent(data))
          .catch((e) => push(e.message))
      }
    } else {
      setShowContent(false)
    }
  }, [opened, content, id, request, locale, push, isTrial])

  return (
    <>
      <tr
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClickCapture={handleOpenCard}
        onClick={() => setOpened(!opened)}
      >
        {keys.map((key) => {
          if (key === 'date') {
            return <DateCell key={key} date={r.date} />
          }
          if (key === 'departureAndDestinationCity') {
            return (
              <DepartureAndDestinationCell
                depCity={r.departureCity}
                desCity={r.destinationCity}
                departureCityCountry={r.departureCityCountry}
                destinationCityCountry={r.destinationCityCountry}
                depTerminal={r.departureTerminal}
                desTerminal={r.destinationTerminal}
                dep
                key={key}
                full={opened}
              />
            )
          }
          if (key === 'containerSize') {
            return <ContainerSizeCell size={r.containerSize} key={key} />
          }
          if (key === 'service') {
            return (
              <ServiceCell service={r.service} logo={r.serviceLogo} key={key} />
            )
          }
          if (key === 'rate') {
            return (
              <RateCell
                rate={r.rate}
                rateUSD={r.rateUSD}
                currency={r.currency}
                showZero
                key={key}
                onSendRequest={setRequestPromptData.bind(this, r)}
              />
            )
          }
          if (key === 'daysFreeUse') {
            return <DaysFreeUseCell daysFreeUse={r.daysFreeUse} key={key} />
          }
          return (
            <PriceOverUseCell
              priceOverUse={r.priceOverUse}
              currency={r.currency}
              opened={opened}
              key={key}
            />
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
            <div className={c.info_content}>
              {content ? (
                <>
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
                  <div className={c.info_subinfo}>
                    <div className={c.info_condition_head}>
                      {PanelLocale['валидность'][locale]}:
                    </div>
                    <div className={c.info_condition_row_hard}>
                      {r.validity !== ''
                        ? r.validity
                        : PanelLocale['не_указано'][locale]}
                    </div>
                  </div>
                  <div className={c.info_contacts}>
                    <div
                      className={c.info_contacts_phone_head}
                      onClickCapture={() =>
                        handleShowContact({
                          event: 'click-phone',
                          data: content.contractor,
                        })
                      }
                    >
                      <img src={phoneIcon} alt="Телефон" />
                      {PanelLocale['показать_телефон'][locale]}
                    </div>
                    {content.contractor.phone.split(';').length > 1 ? (
                      content.contractor.phone.split(';').map((row, idx) => (
                        <div
                          className={c.info_contacts_phone_row}
                          key={idx}
                          style={
                            idx ===
                            content.contractor.phone.split(';').length - 1
                              ? { marginBottom: '30px' }
                              : {}
                          }
                        >
                          {row !== '' && showPhone ? row : ''}
                        </div>
                      ))
                    ) : (
                      <div
                        className={c.info_contacts_phone_row}
                        style={{ marginBottom: '30px' }}
                      >
                        {content.contractor.phone !== '' && showPhone
                          ? content.contractor.phone
                          : ''}
                      </div>
                    )}
                    <div
                      className={c.info_contacts_email_head}
                      onClickCapture={() =>
                        handleShowContact({
                          event: 'click-email',
                          data: content.contractor,
                        })
                      }
                    >
                      <img src={emailIcon} alt="Email" />
                      {PanelLocale['показать_почту'][locale]}
                    </div>
                    {content.contractor.email.split(';').length > 1 ? (
                      content.contractor.email.split(';').map((row, idx) => (
                        <div
                          className={c.info_contacts_phone_row}
                          key={idx}
                          style={
                            idx ===
                            content.contractor.email.split(';').length - 1
                              ? { marginBottom: '30px' }
                              : {}
                          }
                        >
                          {row !== '' && showEmail ? row : ''}
                        </div>
                      ))
                    ) : (
                      <div
                        className={c.info_contacts_phone_row}
                        style={{ marginBottom: '30px' }}
                      >
                        {content.contractor.email !== '' && showEmail
                          ? content.contractor.email
                          : ''}
                      </div>
                    )}
                  </div>
                  <EnvelopButton onClick={setRequestPromptData.bind(this, r)} />
                </>
              ) : (
                <span>{PanelLocale['загрузка'][locale]}...</span>
              )}
            </div>
          )}
        </td>
      </tr>
    </>
  )
}
