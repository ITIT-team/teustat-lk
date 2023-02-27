import React from 'react'
import { getRandomColor } from 'utils/getRandomColor'

import { OneLineCard } from './OnLineCard'
import { GraphicsContainer } from './GraphicsContainer'

import s from 'styles/Graphic/GraphicTools/main.module.css'

export const GraphicTools = ({
  datasets,
  setDatasets,
  onOpenNewDatasetPopup=()=>{},
  onOpenRewriteDatasetPopup=color=>{}
}) => {
  return (
    <div className={s.tools_container}>
      <h3 className={s.heading}>График изменений стоимости</h3>
      <GraphicsContainer datasets={datasets} />
      <table className={s.datasets_table}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Пункт отправления/назначения</th>
            <th style={{ width: '9%' }}>Агент</th>
            <th style={{ width: '11%' }}>Размер контейнера</th>
            <th style={{ width: '10%' }}>Принадлежность контейнера</th>
            <th style={{ width: '10%' }}>НДС</th>
            <th style={{ width: '8%' }}>Цвет</th>
            <th style={{ width: '8%' }}>Редактировать</th>
            <th style={{ width: '8%' }}>Выключить</th>
            <th style={{ width: '8%' }}>Копировать</th>
            <th style={{ width: '8%' }}>Удалить</th>
          </tr>
        </thead>
        <tbody>
        {
          datasets.map(
            d => <OneLineCard
              key={d.datasetColor}
              dataset={d}
              onHideDataset={val => {
                setDatasets(prev => {
                  let currentDataset = prev.find(el => el.datasetColor === d.datasetColor)
                  currentDataset.hidded = val
                  return prev.concat([])
                })
              }}
              onDeleteDataset={() => setDatasets(prev => prev.filter(dataset => dataset.datasetColor !== d.datasetColor))}
              onRewriteDataset={() => onOpenRewriteDatasetPopup(d)}
              onCopyDataset={dataset => setDatasets(prev => prev.concat([{ ...dataset, datasetColor: getRandomColor() }]))}
            />
          )
        }
        </tbody>
      </table>
      <div className={s.add_btn} onClick={onOpenNewDatasetPopup}>+ Построить новый график</div>
    </div>
  )
}
