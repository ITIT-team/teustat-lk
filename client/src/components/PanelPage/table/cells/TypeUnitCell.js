import React, { useRef, useEffect } from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const TypeUnitCell = ({
  typeUnit,
  asDiv=false,
  style={},
  checkWidth=false
}) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current && checkWidth){
      checkWidth(ref.current.offsetWidth)
    }
  }, [checkWidth])

  const children = () => {
    if (typeUnit !== '' && typeUnit !== 'Объем/Вес'){
      return (
        <div className={c.type_unit_cell}>
          <div
            className={c.type_unit_text}
            style={{
              background: typeUnit === 'Объем' ? '#f9e1ff' : '#cdf0ff'
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
          Объем
        </div>
        &nbsp;
        <div
          className={c.type_unit_text}
          style={{background: '#cdf0ff'}}
        >
          Вес
        </div>
      </div>
    )
  }

  if (asDiv) return <div ref={ref} style={style}>{children()}</div>
  return <td ref={ref} style={style}>{children()}</td>
}
