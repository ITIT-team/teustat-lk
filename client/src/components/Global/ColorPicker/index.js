import React from 'react'
import { usePush } from 'hooks'
import s from 'styles/components/color_picker.module.css'

export const ColorPicker = ({ colors=[], selectedColor, setSelectedColor, alreadyUsedColors=[] }) => {
  const push = usePush()
  return (
    <div className={s.container}>
      <div className={s.heading}>Цвет</div>
      <div className={s.colors}>
        {
          colors.map(c => (
            <div
              className={s.one_color}
              key={c}
              onClick={() => !alreadyUsedColors.includes(c) ? setSelectedColor(c) : push('Цвет уже использовался')}
              style={selectedColor === c ? { borderColor: 'var(--hardBlue)' } : {}}
            >
              <div
                className={s.one_color_heart}
                style={{ backgroundColor: alreadyUsedColors.includes(c) ? 'gray' : c }}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
