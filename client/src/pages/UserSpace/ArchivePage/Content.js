import React, { useState, useEffect } from 'react'
import { useHttp, usePush } from 'hooks'
import st from 'styles/UserSpace/ArchivePage/content.module.css'

export const Content = () => {
  const [recs, setRecs] = useState(null)
  const { request, loading } = useHttp()
  const push = usePush()

  useEffect(() => {
    (async () => {
      try {
        const data = await request('/api/get_archive')
        console.warn(data)
        setRecs(data)
      } catch (e) {
        push(e.message)
      }
    })()
  }, [request, push])
  
  return (
    <div className={st.cards_area}>
      { JSON.stringify(recs) }
    </div>
  )
}
