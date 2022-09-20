import React, { useState, useEffect } from 'react'
import { First } from './Slides/First'
import { Second } from './Slides/Second'
import { Third } from './Slides/Third'
import { Fourth } from './Slides/Fourth'

import st from 'styles/PanelPage/StartInstruction/main.module.css'

export const StartInstruction = ({ onFinish=()=>{} }) => {
  const [showedSlide, setShowedSlide] = useState(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setTimeout(() => setShowedSlide(0), 500)
    setTimeout(() => setShowedSlide(1), 2500)
    setTimeout(() => setShowedSlide(2), 4500)
    setTimeout(() => setShowedSlide(3), 6500)
    setTimeout(() => onFinish(), 8000)

    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [ onFinish ])

  return (
    <div className={st.black_blur}>
      { showedSlide === 0 && <First /> }
      { showedSlide === 1 && <Second /> }
      { showedSlide === 2 && <Third /> }
      { showedSlide === 3 && <Fourth /> }
    </div>
  )
}
