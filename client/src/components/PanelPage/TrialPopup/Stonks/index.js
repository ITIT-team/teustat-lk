import React, { useRef, useEffect } from 'react'
import lottie from 'lottie-web'
import s from 'styles/PanelPage/TrialPopup/stonks.module.css'

export const Stonks = () => {
  const stonksRef = useRef()

  useEffect(() => {
    if (stonksRef.current) {
      lottie.loadAnimation({
        container: stonksRef.current,
        renderer: 'svg',
        autoplay: true,
        loop: true,
        // animationData: require('assets/animations/stonks_animation.json'),
      })
    }
  }, [])

  return (
    <div className={s.stonks} ref={stonksRef} />
  )
}
