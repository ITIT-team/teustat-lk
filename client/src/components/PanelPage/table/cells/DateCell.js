import React, { useRef, useEffect } from 'react'

import clockIcon from 'assets/panel/table/clock_icon.svg'
import c from 'styles/PanelPage/table/table.module.css'

export const DateCell = ({ date, checkWidth=false }) => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    return (
        <td ref={ref}>
            <div className={c.date_cell}>
                <img src={clockIcon} alt='' />
                <div>{new Date(date).toLocaleDateString('ru-RU')}</div>
            </div>
        </td>
    )
}

