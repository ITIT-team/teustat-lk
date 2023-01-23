import React, { useState, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { useHttp, usePush } from 'hooks'

import { BlurPage } from 'components/Global/BlurPage'
import { FullSpinLoader } from 'components/Global/FullSpinLoader'
import { CitySelect } from 'components/Graphic/CitySelect'
import { ServiceSelect } from 'components/Graphic/ServiceSelect'
import { IntervalPicker } from 'components/Graphic/IntervalPicker'
import { ThumblersRow } from 'components/PanelPage/ThumblersRow'
import { Thumbler } from 'components/PanelPage/Thumbler'
import { ColorPicker } from 'components/Global/ColorPicker'

import { getRandomColor } from 'utils'

import { PanelLocale } from 'locales'

import pointIcon from 'assets/panel/tabs/map_point_icon.svg'
import flagIcon from 'assets/panel/tabs/flag_icon.svg'
import userIcon from 'assets/panel/filter/user_icon.svg'
import labelIcon from 'assets/userspace/label_icon.svg'
import s from 'styles/Graphic/NewGraphicPopup/main.module.css'

export const NewGraphicPopup = ({
  onClosePopup = () => { },
  addNewDataset = () => { },
  alreadyUsedColors = [],
  rewritableData = null
}) => {
  const { locale } = useGlobalContext()
  const [newDataset, setNewDataset] = useState({
    ratesType: rewritableData.ratesType,
    cityFrom: null,
    cityTo: null,
    service: null,
    containerSize: rewritableData.containerSize || '20',
    containerOwner: rewritableData.containerOwner || 'COC',
    rateType: rewritableData.rateType || '',
  })
  const [datasetColor, setDatasetColor] = useState()
  const [departureCities, setDepartureCities] = useState(null)
  const [selectedDepartureCity, setSelectedDepartureCity] = useState(
    rewritableData.cityFrom || null
  )
  const [destinationCities, setDestinationCities] = useState(null)
  const [selectedDestinationCity, setSelectedDestinationCity] = useState(
    rewritableData.cityTo || null
  )
  const [services, setServices] = useState(null)
  const [selectedService, setSelectedService] = useState(
    rewritableData.service || null
  )
  const [sizeOwnerTypes, setSizeOwnerTypes] = useState(null)
  const [colorsDataList, setColorsDataList] = useState([])
  const [timeInterval, setTimeInterval] = useState(
    rewritableData.timeInterval || {
      from: null,
      to: null
    }
  )

  const { request, loading } = useHttp()
  const push = usePush()

  const changeHandler = (key, value) =>
    setNewDataset(prev => ({ ...prev, [key]: value }))

  const fetchRecords = async () => {
    let records = []
    try {
      records = await request('/graphics/get_graphics_data', {
        ...newDataset,
        dateFrom: timeInterval.from?.toLocaleDateString('ru').split('.').reverse().join('-') || null,
        dateTo: timeInterval.to?.toLocaleDateString('ru').split('.').reverse().join('-') || null,
      })
    } catch (e) {
      push(e.message)
    } finally {
      return records
    }
  }

  const saveHandler = async () => {
    if (!selectedDepartureCity || !selectedDestinationCity || !selectedService || newDataset.rateType === '') {
      push('Заполните все необходимые данные')
      return
    }
    const records = await fetchRecords()
    addNewDataset({
      ...newDataset,
      cityFrom: selectedDepartureCity,
      cityTo: selectedDestinationCity,
      service: selectedService,
      datasetColor,
      hidded: false,
      timeInterval,
      records
    })
    onClosePopup()
  }

  useEffect(() => {
    (async () => {
      try {
        const requests = [
          'citiesDeparture',
          'citiesDestination',
          'getService',
          'sizeOwnerType',
        ]
        const res = await Promise.all(
          requests.map(req => request(`/graphics/get_filters_data/${req}`, newDataset))
        )
        setDepartureCities(res[0])
        setDestinationCities(res[1])
        setServices(res[2])
        setSizeOwnerTypes(res[3])
      } catch (e) {
        push(e.message)
      }
    })()
  }, [push, request, newDataset])

  useEffect(() => {
    changeHandler('cityFrom', selectedDepartureCity?.id || null)
  }, [selectedDepartureCity])

  useEffect(() => {
    changeHandler('cityTo', selectedDestinationCity?.id || null)
  }, [selectedDestinationCity])

  useEffect(() => {
    changeHandler('service', selectedService?.id || null)
  }, [selectedService])

  useEffect(() => {
    const colorsArray = rewritableData.datasetColor ? [rewritableData.datasetColor].concat(Array.from({ length: 13 }, getRandomColor)) : Array.from({ length: 14 }, getRandomColor)
    setColorsDataList(colorsArray)
    setDatasetColor(colorsArray.find(c => !alreadyUsedColors.includes(c)))
  }, [alreadyUsedColors, rewritableData.datasetColor])

  return (
    departureCities &&
    destinationCities &&
    services &&
    sizeOwnerTypes
  ) ? (
    <BlurPage onClick={onClosePopup} black>
      <div onClick={e => e.stopPropagation()} className={s.container}>
        <div className={s.heading}>Заполните все фильтры</div>
        <div className={s.selects}>
          <div className={s.one_select}>
            <CitySelect
              items={departureCities}
              result={selectedDepartureCity}
              setResult={setSelectedDepartureCity}
              placeholder='Пункт отправления'
              logo={pointIcon}
            />
          </div>
          <div className={s.one_select}>
            <CitySelect
              items={destinationCities}
              result={selectedDestinationCity}
              setResult={setSelectedDestinationCity}
              placeholder='Пункт назначения'
              logo={flagIcon}
              withoutBorder
            />
          </div>
          <div className={s.one_select}>
            <ServiceSelect
              items={services}
              result={selectedService}
              setResult={setSelectedService}
              placeholder='Агент'
              logo={userIcon}
            />
          </div>
          <div className={s.one_select}>
            <IntervalPicker
              result={timeInterval}
              setResult={setTimeInterval}
              placeholder='Диапазон времени'
              logo={labelIcon}
              withoutBorder
            />
          </div>
        </div>
        <div className={s.thumblers}>
          <div className={s.one_thumbler}>
            <ThumblersRow
              rowName={PanelLocale['размер_контейнера'][locale]}
              thumblersData={[
                {
                  key: 's20',
                  name: PanelLocale['20'][locale],
                  filterValue: newDataset.containerSize === '20',
                  disabled: !sizeOwnerTypes.size.includes('20')
                },
                {
                  key: 's20t',
                  name: PanelLocale['20_тяж.'][locale],
                  filterValue: newDataset.containerSize === '20 фут.тяж.',
                  disabled: !sizeOwnerTypes.size.includes('20 фут.тяж.')
                },
                {
                  key: 's40',
                  name: PanelLocale['40'][locale],
                  filterValue: newDataset.containerSize === '40',
                  disabled: !sizeOwnerTypes.size.includes('40')
                }
              ]}
              setFilter={data => setNewDataset(prev =>
                ({ ...prev, containerSize: data.s20 ? '20' : (data.s20t ? '20 фут.тяж.' : '40') }))
              }
              withAllOption={false}
              rowHeight={50}
              rowWidth={260}
            />
          </div>
          <div className={s.one_thumbler}>
            <ThumblersRow
              rowName={PanelLocale['принадлежность_контейнера'][locale]}
              thumblersData={[
                {
                  key: 'coc',
                  name: PanelLocale['COC'][locale],
                  filterValue: newDataset.containerOwner === 'COC',
                  disabled: !sizeOwnerTypes.owner.includes('COC')
                },
                {
                  key: 'soc',
                  name: PanelLocale['SOC'][locale],
                  filterValue: newDataset.containerOwner === 'SOC',
                  disabled: !sizeOwnerTypes.owner.includes('SOC')
                }
              ]}
              setFilter={data => setNewDataset(prev => ({ ...prev, containerOwner: data.coc ? 'COC' : 'SOC' }))}
              withAllOption={false}
              rowHeight={50}
              rowWidth={260}
            />
          </div>
        </div>
        <div className={s.colors_section}>
          <div className={s.color_picker}>
            <ColorPicker
              colors={colorsDataList}
              selectedColor={datasetColor}
              setSelectedColor={setDatasetColor}
              alreadyUsedColors={alreadyUsedColors}
            />
          </div>
          <div className={s.checkers}>
            {
              sizeOwnerTypes.type.includes('Импорт') &&
              <Thumbler
                name='Импорт НДС 0%'
                val={newDataset.rateType === 'Импорт'}
                setVal={val => setNewDataset(prev => ({ ...prev, rateType: val ? 'Импорт' : '' }))}
              />
            }
            {
              sizeOwnerTypes.type.includes('Экспорт') &&
              <Thumbler
                name='Экспорт НДС 0%'
                val={newDataset.rateType === 'Экспорт'}
                setVal={val => setNewDataset(prev => ({ ...prev, rateType: val ? 'Экспорт' : '' }))}
              />
            }
            {
              sizeOwnerTypes.type.includes('Каботаж') &&
              <Thumbler
                name='Каботаж НДС 20%'
                val={newDataset.rateType === 'Каботаж'}
                setVal={val => setNewDataset(prev => ({ ...prev, rateType: val ? 'Каботаж' : '' }))}
              />
            }
          </div>
        </div>
        <div className={s.btn_container}>
          <div className={`${s.btn} ${s.btn_cancel}`} onClick={onClosePopup}>Очистить все</div>
          <div className={`${s.btn} ${s.btn_ok}`} onClick={saveHandler}>Ок</div>
        </div>
        {loading && <FullSpinLoader />}
      </div>
    </BlurPage>
  ) : <FullSpinLoader />
} 