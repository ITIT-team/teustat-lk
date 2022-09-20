import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import { EnvelopIcon } from 'components/Global/EnvelopIcon'
import lottie from 'lottie-web'
import st from 'styles/PanelPage/StartInstruction/main.module.css'

import { UserspaceLocale } from 'locales'

export const Fourth = () => {
  const { locale } = useGlobalContext()
  const arrowRef = useRef()

  useEffect(() => {
    if (arrowRef.current){
      lottie.loadAnimation({
        container: arrowRef.current,
        renderer: 'svg',
        autoplay: true,
        loop: true,
        animationData: require('assets/animations/arrow_animation.json')
      })
    }
  }, [])

  return (
    <div className={st.envelop_lighter}>
      <EnvelopIcon />
      <div className={st.fourth_arrow} ref={arrowRef} />
      <div className={st.fourth_text}>{UserspaceLocale['отправить_заявку'][locale]}</div>
    </div>
  )
}
