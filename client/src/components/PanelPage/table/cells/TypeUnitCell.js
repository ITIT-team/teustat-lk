import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const TypeUnitCell = ({
  typeUnit,
  asDiv=false,
  style={},
  checkWidth=false
}) => {
  const ref = useRef()
  const { locale } = useGlobalContext()

  useEffect(() => {
    if (ref.current && checkWidth){
      checkWidth(ref.current.offsetWidth)
    }
  }, [checkWidth])

  const children = () => {
    if (typeUnit !== '' && typeUnit !== PanelLocale['объем/вес'][locale]){
      return (
        <div className={c.type_unit_cell}>
          <div
            className={c.type_unit_text}
            style={{
              background: typeUnit === PanelLocale['объем'][locale] ? '#f9e1ff' : '#cdf0ff'
            }}
          >
            {typeUnit}
          </div>
        </div>
      )
    } else return (
      <div className={c.type_unit_cell}>
        <div
          className={c.type_unit_text}
          style={{background: '#f9e1ff'}}
        >
          {PanelLocale['объем'][locale]}
        </div>
        &nbsp;
        <div
          className={c.type_unit_text}
          style={{background: '#cdf0ff'}}
        >
          {PanelLocale['вес'][locale]}
        </div>
      </div>
    )
  }

  if (asDiv) return <div ref={ref} style={style}>{children()}</div>
  return <td ref={ref} style={style}>{children()}</td>
}
