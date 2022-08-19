import React from 'react'
import { useGlobalContext } from 'Context'
import c from 'styles/PanelPage/table/table.module.css'

import { PanelLocale } from 'locales'

export const ContainerOwnerCell = ({ containerOwner }) => {
    const { locale } = useGlobalContext()

    return (
        <td>
            {
                containerOwner !== ''
                &&
                <div className={c.container_owner_cell}>
                    <div
                        data-prompt-text={
                            containerOwner === 'COC'
                                ?
                                PanelLocale['coc_контейнер_перевозчика'][locale]
                                :
                                PanelLocale['soc_контейнер_заказчика'][locale]
                        }
                        className={c.container_owner_text}
                    >
                        {containerOwner}
                    </div>
                </div>
            }
        </td>
    )
}
