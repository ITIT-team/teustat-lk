import React from 'react'
import st from 'styles/components/blurpage.module.css'

export const BlurPage = ({children, onClick=()=>{}, black=false}) => {
  return (
    <div className={black ? st.blur_black_page : st.blur_page} onClick={onClick}>
      { children }
    </div>
  )
}
