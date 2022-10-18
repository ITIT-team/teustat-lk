import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { getDataFromRecords } from 'utils'
import { Table } from 'components/ArchivePage/Table'
import { Loader } from 'components/Global/Loader'

import { PanelLocale } from 'locales'

import st from 'styles/UserSpace/ArchivePage/content.module.css'

export const Content = ({ filters }) => {
  const { locale } = useGlobalContext()
  const [recs, setRecs] = useState({})
  const [markedRecords, setMarkedRecords] = useState([])
  const { request, loading } = useHttp()
  const push = usePush()

  useEffect(() => {
    (async () => {
      try {
        let data = await request('/api/get_archive')
        const serviceLogos = await request('/panel/get_data', {
          routePath: '/getOther/logoContractor',
          clientDate: new Date().toLocaleDateString('ru-RU'),
          language: locale,
        })
        data.forEach(r => {
          const img = serviceLogos.find(el => el.name === r.service && r.service !== '')
          r.serviceLogo = img ? img.logo : null
        })
        const categories = getDataFromRecords(data, 'betType')
        let dataWithKeys = {}
        categories.forEach(category => 
          dataWithKeys[category] = data.filter(rec => rec.betType === category)
        )
        setRecs(dataWithKeys)
      } catch (e) {
        push(e.message)
      }
    })()
  }, [request, push, locale])

  const filterRecords = data => {
    const out = data.filter(record => {
      const entries = Object.entries(record)
      let flag = false
      entries.forEach(ent => {
        if (['serviceLogo', 'id'].includes(ent[0])) return
        if (ent[0] === 'date') {
          const formattedDate = new Date(ent[1]).toLocaleDateString(locale)
          if (formattedDate.includes(filters.search.toLowerCase())) flag = true
        }
        if (ent[1].toString().toLowerCase().includes(filters.search.toLowerCase())) flag = true
      })
      return flag
    })
    return out
  }
  
  return (
    <>
      {
        loading ?
        <Loader />
        :
        Object.keys(recs).length !== 0 ?
          filterRecords([].concat(...Object.values(recs))).length !== 0 ?
            Object.keys(recs).map(
              category => <Table
                category={category}
                records={filterRecords(recs[category])}
                key={category}
                markedRecords={markedRecords}
                setMarkedRecords={setMarkedRecords}
              />
            )
            :
            <h1 className={st.status_message}>{PanelLocale['совпадений_нет'][locale]}</h1>
          :
          <h1 className={st.status_message}>{PanelLocale['список_пуст'][locale]}</h1>
      }
    </>
  )
}
