import React from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/Table/table.module.css'

import { PanelLocale } from 'locales'

export const ContainerSizeCell = ({ size }) => {
    const { locale } = useGlobalContext()
    return (
        <td>
            {
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
            }
        </td>
    )
}
