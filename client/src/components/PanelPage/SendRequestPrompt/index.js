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
  const push = usePush()
  const { request, loading } = useHttp()
  const animationRef = useRef()

  const sendHandler = async () => {
    try {
      await request('/panel/send_request', {
        rateId: record.id,
        rateUSD: record.rateUSD,
        rate: record.rate,
        currency: record.currency,
        containerCount: count
      })
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
              <img className={st.service_icon_img} alt={record.service} src={`data:image/png;base64,${record.serviceLogo}`} />
              <div className={st.service_icon_name}>{record.service}</div>
            </div>
            {
              record.intermodalLogo
              &&
              <div className={st.service_icon}>
                <img className={st.service_icon_img} alt={record.terminal} src={`data:image/png;base64,${record.intermodalLogo}`} />
                <div className={st.service_icon_name}>{record.terminal}</div>
              </div>
            }
          </div>
          <div className={st.count}>
            <div className={st.subhead}>{PanelLocale['количество_контейнеров'][locale]}:</div>
            <CountChanger count={count} setCount={setCount} />
          </div>
        </div>
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
