import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from 'Context'

import clockIcon from 'assets/panel/table/clock_icon.svg'
import c from 'styles/PanelPage/table/table.module.css'

export const DateCell = ({ date, checkWidth=false }) => {
    const ref = useRef()
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    const chooseDateLocale = loc => {
        switch (loc) {
            case 'ru': return 'ru-RU'
            case 'en': return 'en-EN'
            case 'cn': return 'zh-Hans-CN'
            default: return 'ru-RU'
        }
    }

    return (
        <td ref={ref}>
            <div className={c.date_cell}>
                <img src={clockIcon} alt='' />
                <div>{new Date(date).toLocaleDateString(chooseDateLocale(locale))}</div>
            </div>
        </td>
    )
}

