import React from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const NdsCell = ({ rateType, customNds }) => 
    <td>
        <div className={c.nds_cell}>
            {
                customNds ?
                customNds
                :
                <>
                    {
                        rateType === 'Каботаж' && '20%'
                    }
                    {
                        rateType === 'Импорт' && '0%'
                    }
                    {
                        rateType === 'ЖД Китай' && '0%'
                    }
                    {
                        rateType === 'Экспорт' && '0%'
                    }
                </>
            }
        </div>
    </td>