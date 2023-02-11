import React, { useState, useEffect } from 'react'
import { useGlobalContext, usePanelContext } from 'Context'
import { useHttp, usePush } from 'hooks'
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
import c from 'styles/PanelPage/Table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'

import { PanelLocale } from 'locales'
import { ContactList } from 'components/PanelPage/ContactList'

export const FraxtRowWrapper = ({
  openCard,
  handleContact,
  r,
  filter,
  id,
  keys,
}) => {
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showContent, setShowContent] = useState(false)
  const { request } = useHttp()
  const push = usePush()
  const { locale } = useGlobalContext()
  const { setRequestPromptData, isTrial } = usePanelContext()
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
                depTerminal={
                  r.departureCityCountry === 'РОССИЯ'
                    ? r.departureTerminal
                    : null
                }
                desTerminal={
                  r.destinationCityCountry === 'РОССИЯ'
                    ? r.destinationTerminal
                    : null
                }
                key={key}
                full={opened}
                departureCityCountry={r.departureCityCountry}
                destinationCityCountry={r.destinationCityCountry}
                alwaysShowTerminals
              />
            )
          }
          if (key === 'destinationDropOff') {
            return (
              <DestinationDropOffCell
                destinationDropOff={r.destinationDropOff}
                needShowDropOff={filter.cityOfGiven !== ''}
                key={key}
              />
            )
          }
          if (key === 'containerSize') {
            return <ContainerSizeCell size={r.containerSize} key={key} />
          }
          if (key === 'containerOwner') {
            return (
              <ContainerOwnerCell containerOwner={r.containerOwner} key={key} />
            )
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
                key={key}
                onSendRequest={setRequestPromptData.bind(this, r)}
              />
            )
          }
          if (key === 'rateDropOff') {
            return (
              <RateDropOffCell
                cityOfGiven={filter.cityOfGiven}
                rateDropOff={r.rateDropOff}
                key={key}
              />
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
                    {r.validity !== ''
                      ? r.validity
                      : PanelLocale['не_указано'][locale]}
                  </div>
                  <div className={c.info_contacts} style={{ marginBottom: 10 }}>
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
                          contactTitle={PanelLocale['показать_телефон'][locale]}
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
                  <EnvelopButton onClick={setRequestPromptData.bind(this, r)} />
                </>
              ) : (
                <div>{PanelLocale['загрузка'][locale]}...</div>
              )}
            </div>
          )}
        </td>
      </tr>
    </>
  )
}
