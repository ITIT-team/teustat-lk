import React from 'react'
import c from 'styles/PanelPage/thumbler.module.css'

export const Thumbler = ({ name, val, setVal, disabled=false }) => 
    <div className={c.thumbler} onClick={disabled ? () => {} : () => setVal(!val)}>
        <div className={c.thumbler_checkbox + (val ? ` ${c.thumbler_active}` : '') + (disabled ? ` ${c.thumbler_disabled}` : '')}>
            {
                val
                &&
                <>&#10004;</>
            }
        </div>
        <div className={c.thumbler_name}>{name}</div>
    </div>
