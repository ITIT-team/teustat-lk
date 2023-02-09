import React, { useState, useEffect } from 'react'
import { PanelContext, useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'
import { FilterPanel } from 'components/PanelPage/Filter'
import { Loader } from 'components/Global/Loader'
import { FraxtTable } from 'components/PanelPage/Table/FraxtTable'
import { JdTable } from 'components/PanelPage/Table/JdTable'
import { AutoTable } from 'components/PanelPage/Table/AutoTable'
import { GivenTable } from 'components/PanelPage/Table/GivenTable'
import { CrossTable } from 'components/PanelPage/Table/CrossTable'
import { GroupageTable } from 'components/PanelPage/Table/GroupageTable'
import { Noop } from 'components/Noop'
import { SendRequestPrompt } from 'components/PanelPage/SendRequestPrompt'
import { StartInstruction } from 'components/PanelPage/StartInstruction'
import { TrialPopup } from 'components/PanelPage/TrialPopup'

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

export const PanelPage = ({ isTrial=false }) => {
  const [records, setRecords] = useState(null)
  const [tabs, setTabs] = useState(JSON.parse(localStorage.getItem('filters_data')) || INITIAL_TABS_STATE)
  const [activetab, setActivetab] = useState(5)
  const [course, setCourse] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [pulse, setPulse] = useState(true)
  const [requestPromptData, setRequestPromptData] = useState(null)
  const [showInstruction, setShowInstruction] = useState(() => {
    let animationTimes = localStorage.getItem('animation_times')
    if (!animationTimes) {
      localStorage.setItem('animation_times', '0')
      animationTimes = 0
    }
    return !isTrial && parseInt(animationTimes) <= 3
  })
  const { request } = useHttp()
  const push = usePush()
  const { locale, userData } = useGlobalContext()

  useEffect(() => {
    setRequestPromptData(null)
    setRecords(null)
    setTabs(INITIAL_TABS_STATE)
    setPdf(null)
  }, [locale])

  useEffect(() => {
    ;(async () => {
      try {
        const routes = [
          '/serviceBoard/freight',
          '/serviceBoard/railway',
          '/serviceBoard/trucking',
          '/serviceBoard/delivery',
          '/serviceBoard/fobFor',
          '/serviceBoard/groupage',
          '/getOther/course',
          '/getOther/logoContractor',
        ]
        let result = await Promise.all(
          routes.map((route) =>
            request(isTrial ? '/trial/get_panel_data' : '/panel/get_data', {
              routePath: route,
              clientDate: new Date().toLocaleDateString('ru-RU'),
              language: locale || 'ru',
            })
          )
        )

        for (let i = 0; i <= 5; i++) {
          result[i].forEach((r) => {
            if (i === 4 && r.betType === 'Интермодал') {
              const intermodalLogo = result[7].find(
                (el) => el.name === r.terminal && r.terminal !== ''
              )
              r.intermodalLogo = intermodalLogo ? intermodalLogo.logo : null
            }
            const img = result[7].find(
              (el) => el.name === r.service && r.service !== ''
            )
            r.serviceLogo = img ? img.logo : null
          })
        }

        setRecords([
          { id: 1, recs: result[0] },
          { id: 2, recs: result[1] },
          { id: 3, recs: result[2] },
          { id: 4, recs: result[3] },
          { id: 5, recs: result[4] },
          { id: 6, recs: result[5] },
        ])
        setCourse({
          USD: result[6].currency.USD,
          EUR: result[6].currencyEUR.EUR,
        })
      } catch (e) {
        push(e.message)
      }
    })()
  }, [request, locale, push, isTrial])

  const tabsSetter = (id, changes = {}) => {
    let newTabs = JSON.parse(JSON.stringify(tabs))
    let tabRef = newTabs.find((t) => t.id === id)
    Object.keys(changes).forEach((key) => {
      tabRef[key] = changes[key]
    })
    setTabs(newTabs)
  }

  const requestGA = ({ event, data }) => {
    const eventEnum = {
      click_phone: 'клик',
      copy_phone: 'копирование',
      click_email: 'клик',
      copy_email: 'копирование',
    }
    let dataGA = {
      panel_section: data.betType,
      bet_date: data.date.split('-').reverse().join('/'),
      delivery_direction: `${data.departureCity} - ${data.destinationCity}`,
      bet_size: data.containerSize || '',
      bet_agent_name: data.service,
      bet_rub_price: `${data.rate} руб.`,
      bet_owner: data.containerOwner,
      click_phone: '-',
      click_email: '-',
      user_email: userData.email,
    }
    dataGA.bet_default_price =
      data.currency === 'USD'
        ? `${data.rateUSD} ${data.currency}`
        : `${data.rate} ${data.currency}`

    if (event !== 'click_card') {
      if (['click_phone', 'copy_phone'].includes(event)) {
        dataGA.click_phone =
          event === 'copy_phone'
            ? `${eventEnum[event]} (${data.showContact})`
            : eventEnum[event]
      }
      if (['click_email', 'copy_email'].includes(event)) {
        dataGA.click_email =
          event === 'copy_email'
            ? `${eventEnum[event]} (${data.showContact})`
            : eventEnum[event]
      }
    }

    window.gtag('event', 'click_card', dataGA)
  }

  const chooseFilter = () => {
    switch (activetab) {
      case 1:
        return filterFraxt
      case 2:
        return filterJd
      case 3:
        return filterAuto
      case 4:
        return filterGiven
      case 5:
        return filterCross
      case 6:
        return filterGroupage
      default:
        return () => {}
    }
  }

  const ActiveTable = ({ ...props }) => {
    switch (activetab) {
      case 1:
        return (
          <FraxtTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      case 2:
        return (
          <JdTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      case 3:
        return (
          <AutoTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      case 4:
        return (
          <GivenTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      case 5:
        return (
          <CrossTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      case 6:
        return (
          <GroupageTable
            {...props}
            eventAnalytic={(event) => requestGA(event)}
            {...props}
          />
        )
      default:
        return <Noop />
    }
  }

  const finishInstruction = () => {
    const animationTimes = parseInt(localStorage.getItem('animation_times'))
    localStorage.setItem('animation_times', (animationTimes + 1).toString())
    setShowInstruction(false)
  }

  return (
    <PanelContext.Provider value={{
      records,
      course,
      setPdf,
      pulse,
      setPulse,
      setRequestPromptData,
      setActivetab,
      isTrial
    }}>
      <div className={st.panel_area}>
        {
          pdf && <PdfReader name={pdf.name} data={pdf.data}/>
        }
        {
          (records && course) ?
          <div className="container">
            {
              isTrial && <TrialPopup />
            }
            <FilterPanel
              activetab={activetab}
              setActivetab={setActivetab}
              tabs={tabs}
              tabsSetter={tabsSetter}
            />
            <ActiveTable
              records={chooseFilter()(records.find(r => r.id === activetab)?.recs, tabs.find(t => t.id === activetab), course, locale)}
              filter={tabs.find(t => t.id === activetab)}
              sorterSetter={sortOrder => tabsSetter(activetab, { rateSort: sortOrder })}
            />
            { showInstruction && <StartInstruction onFinish={finishInstruction}/> }
            {
              requestPromptData
              &&
              <SendRequestPrompt
                onClose={setRequestPromptData.bind(this, null)}
                record={requestPromptData}
              />
            }
          </div>
          :
          <Loader />
        }
      </div>
    </PanelContext.Provider>
  )
}
