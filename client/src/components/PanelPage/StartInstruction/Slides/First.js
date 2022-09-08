import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import lottie from 'lottie-web'
import st from 'styles/PanelPage/StartInstruction/main.module.css'

import { UserspaceLocale } from 'locales'

export const First = () => {
  const { locale } = useGlobalContext()
  const arrowRef = useRef()

  useEffect(() => {
    if (arrowRef.current){
      lottie.loadAnimation({
        container: arrowRef.current,
        renderer: 'svg',
        autoplay: true,
        loop: false,
        animationData: require('assets/animations/arrow_animation.json')
      })
    }
  }, [])

  return (
    <div className={st.switcher_lighter}>
      <div className={st.first_arrow} ref={arrowRef} />
      <div className={st.first_text}>{UserspaceLocale['контейнеры'][locale]}</div>
    </div>
  )
}
