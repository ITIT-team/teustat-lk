import React from 'react'
import st from 'styles/PanelPage/request_prompt.module.css'

export const CountChanger = ({
  count,
  setCount,
}) => {
  return (
    <div className={st.count_changer_container}>
      <div
        className={st.btn}
        onClick={setCount.bind(this, prev => {
          const num = parseInt(prev) || 0
          return num !== 0 ? num - 1 : num
        })}
        style={{paddingTop: 2}}
      >-</div>
      <input
        type='text'
        className={st.input}
        value={count}
        onChange={e => setCount(e.target.value.replace(/\D/, ''))}
      />
      <div
        className={st.btn}
        onClick={setCount.bind(this, prev => {
          const num = parseInt(prev) || 0
          return num + 1
        })}
        style={{ paddingTop: 4 }}
      >+</div>
    </div>
  )
}
