import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from 'Context'
import { EnvelopIcon } from 'components/Global'
import lottie from 'lottie-web'
import st from 'styles/PanelPage/StartInstruction/main.module.css'

import { UserspaceLocale } from 'locales'

export const Fourth = () => {
  const { locale } = useGlobalContext()
  const [left, setLeft] = useState(0)
  const arrowRef = useRef()

  useEffect(() => {
    const cellCoordinates = document.body.querySelector('tbody>tr>td:nth-of-type(5)>div>div').getBoundingClientRect()
    setLeft(cellCoordinates.left - 17)

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
    <div className={st.envelop_lighter} style={{left}}>
      <EnvelopIcon style={{
        position: 'absolute',
        top: 16,
        left: 6
      }}/>
      <div className={st.fourth_arrow} ref={arrowRef} />
      <div className={st.fourth_text}>{UserspaceLocale['отправить_заявку'][locale]}</div>
    </div>
  )
}
