import React from 'react'
import { useGlobalContext } from 'Context'
import st from 'styles/UserSpace/AnalyticsPage/main.module.css'

export const AnalyticsPage = () => {
  const { userData: { powerBIUrl } } = useGlobalContext()

  if (!powerBIUrl || powerBIUrl.length === 0){
    return (
      <div className={st.no_data}>
        Панели не подключены
      </div>
    )
  }

  return (
    <div className={st.container}>
      {
        powerBIUrl.map((url, idx) => 
          <div className={st.frame_wrap} key={url}>
            <iframe
              frameBorder='none'
              src={url}
              title={`${idx} panel`}
              width='100%'
              height='100%'
            />
          </div>
        )
      }
    </div>
  )
}
