import React from 'react'
import st from 'styles/components/info_icon.module.css'

export const InfoIcon = ({onClick=()=>{}}) => 
  <div className={st.info_icon} onClick={onClick}>i</div>
