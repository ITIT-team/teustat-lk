import React, { useState, useEffect } from 'react'
import { First } from './Slides/First'
import { Second } from './Slides/Second'
import { Third } from './Slides/Third'

import st from 'styles/PanelPage/StartInstruction/main.module.css'

export const StartInstruction = () => {
  const [showedSlide, setShowedSlide] = useState(0)
  const [timer, setTimer] = useState(null)

  const Slides = () => {
    switch (showedSlide) {
      case 0: return <First />
      case 1: return <Second />
      case 2: return <Third />
      default: return <First />
    }
  }

  useEffect(() => {
    setTimer(
      setInterval(
        () => setShowedSlide(prev => prev + 1),
        2000
      )
    )
  }, [])

  useEffect(() => {
    if (showedSlide === 2) clearInterval(timer)
  }, [showedSlide, timer])

  return (
    <div className={st.black_blur}>
      <Slides />
    </div>
  )
}
