import React from 'react'

import s from 'styles/components/button.module.css'

export const Button = ({
  style={},
  isSubmit=true,
  onClick=()=>{},
  disabled=false,
  children,
}) => (
  <button
    className={s.btn_container}
    style={isSubmit ? {
      background: 'var(--hardBlue)',
      color: 'white',
      ...style
    } : {
      background: 'var(--lightBlue)',
      color: 'var(--hardBlue)',
      ...style
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)
