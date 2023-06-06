import React, { useState, useEffect } from 'react'
import { useGlobalContext, usePanelContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { CommentCell } from './CommentCell'
import { EnvelopButton } from 'components/Global'
import c from 'styles/PanelPage/Table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'
import { ContainerOwnerCell } from './ContainerOwnerCell'

import { PanelLocale, CitiesLocale } from 'locales'
import { ContactList } from 'components/PanelPage/ContactList'

export const CrossRowWrapper = ({ openCard, handleContact, r, id, keys }) => {
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showPhone, setShowPhone] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { request } = useHttp()
  const push = usePush()
  const { locale } = useGlobalContext()
  const { setRequestPromptData, isTrial } = usePanelContext()

  const handleOpenCard = () => {
    if (!opened && !showCard) {
      setShowCard(true)
      openCard()
    }
  }

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

  const contactsColumn = (contractor, showNames = false) => (
    <div className={c.info_contacts}>
      {showNames && (
        <div
          className={c.info_contacts_phone_head}
          style={{ marginBottom: 20 }}
        >
          <img src={userIcon} alt="Имя" />
          {contractor.name}
        </div>
      )}
      {contractor.phone ? (
        <div style={{ marginBottom: 7, width: 290 }}>
          <ContactList
            handleClick={() =>
              handleShowContact({ event: 'click_phone', data: contractor })
            }
            contacts={contractor.phone.split(';')}
            copyContact={(contact) =>
              handleCopyContact('phone', {
                ...contractor,
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
      {contractor.email ? (
        <div style={{ width: 290 }}>
          <ContactList
            handleClick={() =>
              handleShowContact({ event: 'click_email', data: contractor })
            }
            contacts={contractor.email.split(';')}
            copyContact={(contact) =>
              handleCopyContact('email', {
                ...contractor,
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
  )

  return (
    <>
      <tr
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setOpened(!opened)}
        onClickCapture={handleOpenCard}
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
                middleTerminal={(() => {
                  const rusDeparture = r.departureCityСountry === 'РОССИЯ'
                  const rusDestination = r.destinationCityCountry === 'РОССИЯ'
                  if (
                    (!rusDeparture && rusDestination) ||
                    (rusDeparture && !rusDestination)
                  )
                    return r.terminal
                  return null
                })()}
                depStation={
                  r.departureCityCountry === 'РОССИЯ'
                    ? r.departureStation
                    : null
                }
                desStation={(() => {
                  const rusDeparture = r.departureCityCountry === 'РОССИЯ'
                  const rusDestination = r.destinationCityCountry === 'РОССИЯ'
                  if ((rusDeparture && rusDestination) || !rusDestination)
                    return null
                  return r.destinationStation
                })()}
                desTerminal={(() => {
                  const depCityInRussia = r.departureCityCountry === 'РОССИЯ'
                  const desCityInRussia = r.destinationCityCountry === 'РОССИЯ'
                  if (depCityInRussia && desCityInRussia) {
                    if (
                      r.destinationCity ===
                        CitiesLocale['петропавловск_камчатский'][locale] ||
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
          if (key === 'service') {
            return (
              <ServiceCell
                // service={r.service}
                service={
                  r.betType === 'Интермодал'
                    ? `${r.service} + ${r.terminal}`
                    : r.service
                }
                terminal={r.terminal}
                logo={r.serviceLogo}
                intermodalLogo={r.intermodalLogo}
                key={key}
                intermodal={r.betType === 'Интермодал'}
              />
            )
          }
          return (
            <CommentCell comments={r.condition} opened={opened} key={key} />
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
                  {contactsColumn(
                    content.contractor,
                    content.contractor2.name !== ''
                  )}
                  {content.contractor2.name !== '' &&
                    contactsColumn(content.contractor2, true)}
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
