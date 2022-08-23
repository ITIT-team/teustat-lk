import React from 'react'
import st from 'styles/components/blurpage.module.css'

export const BlurPage = ({children}) => {
  return (
    <div className={st.blur_page}>
      { children }
    </div>
  )
}
