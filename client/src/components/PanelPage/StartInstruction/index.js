import React, { useState, useEffect } from 'react'
import { usePanelContext } from 'Context'
import { First } from './Slides/First'
import { Second } from './Slides/Second'
import { Third } from './Slides/Third'
import { Fourth } from './Slides/Fourth'

import st from 'styles/PanelPage/StartInstruction/main.module.css'

export const StartInstruction = () => {
  const { setActivetab } = usePanelContext()
  const [showedSlide, setShowedSlide] = useState(0)

  useEffect(() => {
    setTimeout(() => setShowedSlide(1), 2500)
    setTimeout(() => setShowedSlide(2), 5000)
    setTimeout(() => setShowedSlide(3), 7500)
  }, [ setActivetab ])

  return (
    <div className={st.black_blur}>
      {/* { showedSlide === 0 && <First /> }
      { showedSlide === 1 && <Second /> }
      { showedSlide === 2 && <Third /> }
      { showedSlide === 3 && <Fourth /> } */}
      <Fourth />
    </div>
  )
}
