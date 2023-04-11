import React, { useState, useEffect } from 'react'
import { TailSpin } from '@agney/react-loading'
import { useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { usePanelContext } from 'Context'
import { DepartureAndDestinationCell } from './DepartureAndDestinationCell'
import { DateCell } from './DateCell'
import { ContainerSizeCell } from './ContainerSizeCell'
import { ServiceCell } from './ServiceCell'
import { RateCell } from './RateCell'
import { NdsCell } from './NdsCell'
import { CommentCell } from './CommentCell'
import { EnvelopButton } from 'components/Global/EnvelopButton'
import { TrialPopup } from 'components/PanelPage/TrialPopup'
import c from 'styles/PanelPage/Table/table.module.css'

import phoneIcon from 'assets/panel/table/phone_icon.svg'
import emailIcon from 'assets/panel/table/email_icon.svg'
import pdfIcon from 'assets/panel/table/pdf_icon.svg'

import { PanelLocale } from 'locales'
import { ContactList } from 'components/PanelPage/ContactList'

export const AutoRowWrapper = ({ handleContact, openCard, r, id, keys }) => {
  const { setPdf, setRequestPromptData, isTrial } = usePanelContext()
  const [opened, setOpened] = useState(false)
  const [content, setContent] = useState(null)
  const [showContent, setShowContent] = useState(false)
  const [showTrialPopup, setShowTrialPopup] = useState(false)
  const { request, loading } = useHttp()
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

  const loadPdf = async (id, name) => {
    try {
      if (isTrial) {
        setShowTrialPopup(true)
      } else {
        const data = await request('/panel/get_pdf', { idPrice: id })
        setPdf({ name, data: data.baseContent })
      }
    } catch (err) {
      push({ messages: err.message, err })
    }
  }

  return (
    <>
      {showTrialPopup && (
        <TrialPopup withoutTimeout onClose={() => setShowTrialPopup(false)} />
      )}
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
                departureCityCountry={r.departureCityCountry}
                destinationCityCountry={r.destinationCityCountry}
                key={key}
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
                currency={'руб.'}
                key={key}
                onSendRequest={setRequestPromptData.bind(this, r)}
              />
            )
          }
          if (key === 'nds') {
            return <NdsCell customNds={r.nds} key={key} />
          }
          if (key === 'distance') {
            return (
              <td key={key}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {r.distance}
                </div>
              </td>
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
                  <div className={c.info_subinfo}>
                    <div className={c.info_condition_head}>
                      {PanelLocale['норма_погрузки_выгрузки'][locale]}
                    </div>
                    {r.normLoading !== 0
                      ? `${r.normLoading} ч.`
                      : PanelLocale['не_указано'][locale]}
                    <div
                      className={c.info_condition_head}
                      style={{ marginTop: '30px' }}
                    >
                      {PanelLocale['простой'][locale]}:
                    </div>
                    {`${r.simple} руб.`}
                  </div>
                  <div className={c.info_subinfo}>
                    <div className={c.info_condition_head}>
                      {PanelLocale['полный_прайс'][locale]}:
                    </div>
                    {content.idPrice.map((price) => (
                      <div
                        className={c.pdf_button}
                        key={price.id}
                        onClick={
                          loading
                            ? () => {}
                            : () => loadPdf(price.id, price.name)
                        }
                      >
                        <div className={c.pdf_button_logo}>
                          {loading ? (
                            <TailSpin height="20px" />
                          ) : (
                            <img src={pdfIcon} alt="PDF" />
                          )}
                        </div>
                        <div className={c.pdf_button_text}>
                          <div
                            className={c.pdf_button_name}
                            style={loading ? { color: 'var(--hardGray)' } : {}}
                          >
                            {price.name}.{price.type}
                          </div>
                          <div
                            className={c.pdf_button_size}
                            style={loading ? { color: 'var(--hardGray)' } : {}}
                          >
                            {price.size} KB
                          </div>
                        </div>
                      </div>
                    ))}
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
