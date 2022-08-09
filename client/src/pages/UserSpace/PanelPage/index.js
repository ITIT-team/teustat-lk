import React, { useState, useEffect } from 'react'
import { PanelContext } from 'Context'
import { useHttp } from 'hooks'
import { FilterPanel } from 'components/PanelPage/filter'
import { Loader } from 'components/Global/Loader'
import { FraxtTable } from 'components/PanelPage/table/FraxtTable'
import { JdTable } from 'components/PanelPage/table/JdTable'
import { AutoTable } from 'components/PanelPage/table/AutoTable'
import { GivenTable } from 'components/PanelPage/table/GivenTable'
import { CrossTable } from 'components/PanelPage/table/CrossTable'
// import { GroupageTable } from 'components/PanelPage/table/GroupageTable'
// import TerminalsMap from './components/map'
// import { Graphic } from './components/graphic'
import { Noop } from 'components/PanelPage/Noop'

import {
  filterFraxt,
  filterJd,
  filterAuto,
  filterGiven,
  filterCross,
  filterGroupage
} from 'utils/panel/filters'

import { INITIAL_TABS_STATE } from 'constants/PanelConstants'
import { PdfReader } from 'components/UserSpace/PdfReader'

import st from 'styles/PanelPage/panel.module.css'

export const PanelPage = () => {
  const [records, setRecords] = useState(null)
  const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('filters_data')) || INITIAL_TABS_STATE)
  const [activetab, setActivetab] = useState(5)
  const [course, setCourse] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [pulse, setPulse] = useState(true)
  const { request, error } = useHttp()

  useEffect(() => {
    (async () => {
      try {
        const routes = [
          '/serviceBoard/freight',
          '/serviceBoard/railway',
          '/serviceBoard/trucking',
          '/serviceBoard/delivery',
          '/serviceBoard/fobFor',
          '/serviceBoard/groupage',
          '/getOther/course',
          '/getOther/logoContractor'
        ]
        let result = await Promise.all(
          routes.map(route => request('/panel/get_data', {
            routePath: route,
            clientDate: new Date().toLocaleDateString('ru-RU')
          }))
        )

        for (let i = 0; i <= 5; i++){
          result[i].forEach(r => {
            const img = result[7].find(el => el.name === r.service)
            r.serviceLogo = img ? img.logo : null
          })
        }
        
        setRecords([
          { id: 1, recs: result[0]},
          { id: 2, recs: result[1]},
          { id: 3, recs: result[2]},
          { id: 4, recs: result[3]},
          { id: 5, recs: result[4]},
          { id: 6, recs: result[5]},
        ])
        setCourse(result[6].currency.USD)
      } catch (e) { console.warn(e) }
    })()
  }, [ request ])

  useEffect(() => {
    if (error) console.warn(error)
  }, [error])

  const tabsSetter = (id, changes = {}) => {
    let newTabs = JSON.parse(JSON.stringify(tabs))
    let tabRef = newTabs.find(t => t.id === id)
    Object.keys(changes).forEach(key => {
      tabRef[key] = changes[key]
    })
    setTabs(newTabs)
  }

  const chooseFilter = () => {
    switch (activetab) {
      case 1: return filterFraxt
      case 2: return filterJd
      case 3: return filterAuto
      case 4: return filterGiven
      case 5: return filterCross
      case 6: return filterGroupage
      default: return ()=>{}
    }
  }

  const ActiveTable = ({...props}) => {
    switch (activetab) {
      case 1: return <FraxtTable {...props}/>
      case 2: return <JdTable {...props}/>
      case 3: return <AutoTable {...props}/>
      case 4: return <GivenTable {...props}/>
      case 5: return <CrossTable {...props}/>
      // case 6: return <GroupageTable {...props}/>
      default: return <Noop />
    }
  }

  return (
    <PanelContext.Provider value={{ records, course, setPdf, pulse, setPulse }}>
      <div className={st.panel_area}>
        {
          pdf && <PdfReader name={pdf.name} data={pdf.data}/>
        }
        {
          records ?
          <div className="container">
            <FilterPanel
              activetab={activetab}
              setActivetab={setActivetab}
              tabs={tabs}
              tabsSetter={tabsSetter}
            />
            <ActiveTable
              records={chooseFilter()(records.find(r => r.id === activetab)?.recs, tabs.find(t => t.id === activetab))}
              filter={tabs.find(t => t.id === activetab)}
              sorterSetter={sortOrder => tabsSetter(activetab, { rateSort: sortOrder })}
            />
          </div>
          :
          <Loader />
        }
      </div>
    </PanelContext.Provider>
  )
}
