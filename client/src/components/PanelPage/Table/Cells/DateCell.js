import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from 'Context'
import { RadioButton } from 'components/UserSpace/RadioButton'

import clockIcon from 'assets/panel/table/clock_icon.svg'
import c from 'styles/PanelPage/Table/table.module.css'

export const DateCell = ({
    date,
    checkWidth = false,
    withRadio = false,
    radioChecked = false,
    setRadioChecked = () => {}
}) => {
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
            case 'chi': return 'zh-Hans-CN'
            default: return 'ru-RU'
        }
    }

    return (
        <td ref={ref}>
            <div className={c.date_cell}>
                {
                    withRadio &&
                    <div className={c.date_radio}>
                        <RadioButton checked={radioChecked} setChecked={setRadioChecked} />
                    </div>
                }
                <img src={clockIcon} alt='' />
                <div>{new Date(date.split('T')[0]).toLocaleDateString(chooseDateLocale(locale))}</div>
            </div>
        </td>
    )
}

