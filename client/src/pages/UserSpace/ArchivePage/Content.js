import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { getDataFromRecords, dateSorter, citiesSorter } from 'utils'
import { Table } from 'components/ArchivePageTable'
import { Loader } from 'components/Global/Loader'
import { TrashButton } from 'components/UserSpace/TrashButton'

import { PanelLocale, UserspaceLocale } from 'locales'

import st from 'styles/UserSpace/ArchivePage/content.module.css'

export const Content = ({ filters }) => {
  const { locale } = useGlobalContext()
  const [recs, setRecs] = useState({})
  const [markedRecords, setMarkedRecords] = useState([])
  const { request, loading } = useHttp()
  const push = usePush()

  const clearStates = () => {
    setRecs({})
    setMarkedRecords([])
  }

  useEffect(() => {
    (async () => {
      try {
        clearStates()
        let data = await request('/api/get_archive', { language: locale })
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
      } catch (err) {
        push({ messages: err.message, err })
      }
    })()
  }, [request, push, locale])

  const filterAndSortRecords = data => {
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
    return out.sort(filters.sort === 'Дате' ? dateSorter : citiesSorter)
  }

  const deleteHandler = async() => {
    try {
      await request('/api/remove_archive_records', { rateArray: markedRecords })
      setRecs(prev => {
        Object.keys(prev).forEach(category => {
          prev[category] = prev[category].filter(rec => !markedRecords.includes(rec.id) )
        })
        return prev
      })
      setMarkedRecords([])
      push({ messages: UserspaceLocale['записи_удалены'][locale], ok: true })
    } catch (err) {
      push({ messages: err.message, err })
    }
  }
  
  return (
    <>
      {
        (loading && Object.keys(recs).length === 0) ?
        <Loader />
        :
        Object.keys(recs).length !== 0 ?
          filterAndSortRecords([].concat(...Object.values(recs))).length !== 0 ?
            <>
            {
              Object.keys(recs).map(
                category => <Table
                  category={category}
                  records={filterAndSortRecords(recs[category])}
                  key={category}
                  markedRecords={markedRecords}
                  setMarkedRecords={setMarkedRecords}
                />
              )
            }
            { markedRecords.length > 0 && <TrashButton onClick={deleteHandler} loading={loading} /> }
            </>
            :
            <h1 className={st.status_message}>{PanelLocale['совпадений_нет'][locale]}</h1>
          :
          <h1 className={st.status_message}>{PanelLocale['список_пуст'][locale]}</h1>
      }
    </>
  )
}
