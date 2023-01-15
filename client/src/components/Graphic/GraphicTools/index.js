import React from 'react'
import s from 'styles/Graphic/GraphicTools/main.module.css'

export const GraphicTools = ({ datasets, setDatasets, onOpenNewDatasetPopup=()=>{} }) => {
  return (
    <div className={s.tools_container}>
      <h3 className={s.heading}>График изменений стоимости</h3>
      <div>
        {
          datasets.map((d, index) => <><pre key={index}>{JSON.stringify(d, null, 2)}</pre><br /></>)
        }
      </div>
      <div className={s.add_btn} onClick={onOpenNewDatasetPopup}>+ Построить новый график</div>
    </div>
  )
}
