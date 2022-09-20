import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import { TAB_ID } from 'constants/PanelConstants'
import { GroupageSwitcher } from 'components/PanelPage/Filter/GroupageSwitcher'
import lottie from 'lottie-web'
import st from 'styles/PanelPage/StartInstruction/main.module.css'

import { UserspaceLocale } from 'locales'

export const Second = () => {
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
      <GroupageSwitcher
        activetab={TAB_ID.GROUPAGE}
        switcherStyle={{
          position: 'absolute',
          height: 60,
          width: 'calc(100% - 20px)',
          top: 71,
          left: 10
        }}
      />
      <div className={st.second_arrow} ref={arrowRef} />
      <div className={st.second_text}>{UserspaceLocale['сборные_грузы'][locale]}</div>
    </div>
  )
}
