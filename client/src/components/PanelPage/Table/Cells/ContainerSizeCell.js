import React from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const ContainerSizeCell = ({
    size,
    asDiv=false,
}) => {
    const { locale } = useGlobalContext()
    const child = () => (
        size !== ''
        &&
        <div className={c.container_size_cell}>
            <div className={c.container_size_text}>
                {
                    size === '20 фут.тяж.'
                        ?
                        PanelLocale['20_тяж.'][locale]
                        :
                        PanelLocale[size][locale]
                }
            </div>
        </div>
    )
    return asDiv ? ( <div>{child()}</div> ) : ( <td>{child()}</td> )
}
