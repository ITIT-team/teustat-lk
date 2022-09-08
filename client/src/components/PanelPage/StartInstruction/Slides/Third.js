import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import lottie from 'lottie-web'
import st from 'styles/PanelPage/StartInstruction/main.module.css'

import { UserspaceLocale } from 'locales'

export const Third = () => {
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
    <div className={st.menu_lighter}>
      <div className={st.third_arrow} ref={arrowRef} />
      <div className={st.third_text}>{UserspaceLocale['меню'][locale]}</div>
    </div>
  )
}
