import React from 'react'
import header_st from 'styles/UserSpace/header.module.css'

export const Burger = ({ onClick=()=>{} }) => {
  return (
    <div
      className={header_st.burger}
      onClick={onClick}
    >|||</div>
  )
}
