import React, { useRef, useEffect } from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const ServiceCell = ({ service, logo, checkWidth=false }) => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    return (
        <td ref={ref}>
            <div className={c.service_cell} style={{flexDirection: logo ? 'column' : 'row'}}>
                {
                    logo && <img className={c.service_logo} alt={service} src={`data:image/png;base64,${logo}`}/>
                }
                <div className={c.service_name} style={{marginBottom: logo ? '10px' : 'none'}}>{service}</div>
            </div>
        </td>
    )
}