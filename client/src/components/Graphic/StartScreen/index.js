import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import s from 'styles/Graphic/StartScreen/main.module.css'

export const StartScreen = ({ setShowPopup=()=>{} }) => {
  const animationRef = useRef()
  useEffect(() => {
    if (animationRef.current){
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('assets/animations/start_graphic_animation.json')
      })
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.heading}>
        Чтобы построить график, нужно применить все фильтры
      </div>
      <div className={s.add_btn} onClick={() => setShowPopup(true)}>
        + Построить график
      </div>
      <div className={s.animation} ref={animationRef} />
    </div>
  )
}
