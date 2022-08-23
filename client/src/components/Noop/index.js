import React from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/noop.module.css'

import { PanelLocale } from 'locales'

export const Noop = () => {
    const { locale } = useGlobalContext()
    return (
        <div className={c.noop}>{PanelLocale['скоро_добавим'][locale]}</div>
    )
}
