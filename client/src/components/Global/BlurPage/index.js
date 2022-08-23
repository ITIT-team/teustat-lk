import React from 'react'
import st from 'styles/components/blurpage.module.css'

export const BlurPage = ({children, onClick=()=>{}}) => {
  return (
    <div className={st.blur_page} onClick={onClick}>
      { children }
    </div>
  )
}
