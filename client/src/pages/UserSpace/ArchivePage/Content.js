import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { getDataFromRecords } from 'utils'
import { Table } from 'components/ArchivePage/Table'

export const Content = () => {
  const { locale } = useGlobalContext()
  const [recs, setRecs] = useState(null)
  const [markedRecords, setMarkedRecords] = useState([])
  const { request } = useHttp()
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
  
  return (
    <div>
      {
        recs && Object.keys(recs).map(
          category => <Table
            category={category}
            records={recs[category]}
            key={category}
            markedRecords={markedRecords}
            setMarkedRecords={setMarkedRecords}
          />
        )
      }
    </div>
  )
}
