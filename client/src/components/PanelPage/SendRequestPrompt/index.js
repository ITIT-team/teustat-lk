import React, { useState, useEffect, useRef } from 'react'
import { TailSpin } from '@agney/react-loading'
import lottie from 'lottie-web'
import { useHttp, usePush } from 'hooks'
import { useGlobalContext } from 'Context'
import { BlurPage } from 'components/Global/BlurPage'
import { CountChanger } from './CountChanger'
import st from 'styles/PanelPage/request_prompt.module.css'

import { PanelLocale } from 'locales'

export const SendRequestPrompt = ({
  onClose=()=>{},
  record
}) => {
  const { locale } = useGlobalContext()
  const [count, setCount] = useState(0)
  const [success, setSuccess] = useState(false)
  const [firstLogoWidth, setFirstLogoWidth] = useState(0)
  const push = usePush()
  const { request, loading } = useHttp()
  const animationRef = useRef()
  const textareaRef = useRef()
  const firstLogoRef = useRef()

  useEffect(() => {
    if (firstLogoRef.current) setFirstLogoWidth(firstLogoRef.current.offsetWidth)
  }, [])

  const sendHandler = async () => {
    try {
      if (!record.isGroupage && count === 0) throw new Error('Введите кол-во контейнеров')
      let reqBody = {
        rateId: record.id,
        rateUSD: record.rateUSD || 0,
        rate: record.rate,
        currency: record.currency || 'руб.',
        containerCount: count,
        comments: textareaRef.current.value
      }
      if (record.isGroupage) reqBody = Object.assign(reqBody, {
        typeUnit: record.typeUnit,
        interval: record.interval
      })
      await request('/panel/send_request', reqBody)
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 4500)
    } catch (e) {
      push(e.message)
    }
  }

  const SendForm = () => {
    return (
      <>
        <h3 className={st.prompt_heading}>{PanelLocale['подтвердите_отправку_заявки'][locale]}</h3>
        <div className={st.prompt_subtitle}>{PanelLocale['перевозчик_свяжется_с_вами_напрямую'][locale]}</div>
        <div className={st.count_section}>
          <div className={st.service}>
            <div className={st.subhead}>{PanelLocale['перевозчик'][locale]}:</div>
            <div className={st.service_icon}>
              {
                record.serviceLogo &&
                <img
                  ref={firstLogoRef}
                  className={st.service_icon_img}
                  alt={record.service}
                  src={`data:image/png;base64,${record.serviceLogo}`}
                />
              }
              <div className={st.service_icon_name}>{record.service}</div>
            </div>
            {
              record.betType === 'Интермодал'
              &&
              <div className={st.service_icon}>
                {
                  record.intermodalLogo &&
                  <img
                    className={st.service_icon_img}
                    alt={record.terminal}
                    src={`data:image/png;base64,${record.intermodalLogo}`}
                  />
                }
                <div
                  className={st.service_icon_name}
                  style={(record.serviceLogo && !record.intermodalLogo) ? { marginLeft: firstLogoWidth + 10 || 60 } : {}}
                >
                  {record.terminal}
                </div>
              </div>
            }
          </div>
          {
            !record.isGroupage
            &&
            <div className={st.count}>
              <div className={st.subhead}>{PanelLocale['количество_контейнеров'][locale]}:</div>
              <CountChanger count={count} setCount={setCount} />
            </div>
          }
        </div>
        <textarea
          className={st.textarea}
          rows={4}
          placeholder='Укажите тип груза и оставьте комментарий для быстрого ответа'
          ref={textareaRef}
          maxLength={250}
        />
        <div className={st.buttons_section}>
          <div
            className={st.button + ' ' + st.send_button}
            onClick={sendHandler.bind(this)}
          >{PanelLocale['отправить_заявку'][locale]}</div>
          <div
            className={st.button + ' ' + st.cancel_button}
            onClick={onClose.bind(this)}
          >{PanelLocale['отмена'][locale]}</div>
        </div>
      </>
    )
  }

  const SuccessPopup = () => {
    useEffect(() => {
      if (animationRef.current){
        lottie.loadAnimation({
          container: animationRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: require('assets/animations/send_animation.json')
        })
      }
    }, [])

    return (
      <>
        <h3 className={st.prompt_heading}>{PanelLocale['ваша_заявка_успешно_отправлена'][locale]}</h3>
        <div
          className={st.success_animation}
          ref={animationRef}
        ></div>
        <div
          className={st.prompt_subtitle}
          style={{marginBottom: 0}}
        >{PanelLocale['ждите_ответа_от_перевозчика'][locale]}</div>
      </>
    )
  }

  return (
    <BlurPage onClick={onClose}>
      {
        loading ?
        <TailSpin height='20vh' />
        :
        <div className={st.prompt_container} onClick={e => e.stopPropagation()}>
          { success ? <SuccessPopup /> : <SendForm /> }
        </div>
      }
    </BlurPage>
  )
}
