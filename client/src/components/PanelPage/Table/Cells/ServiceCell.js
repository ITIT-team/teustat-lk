import React, { useRef, useEffect } from 'react'
import c from 'styles/PanelPage/Table/table.module.css'

export const ServiceCell = ({
    service,
    terminal,
    logo,
    intermodalLogo,
    checkWidth=false,
    asDiv=false,
    intermodal=false
}) => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    const oldChildren = () => 
        <div className={c.service_cell} style={{flexDirection: logo ? 'column' : 'row'}}>
            {
                logo && <img className={c.service_logo} alt={service} src={`data:image/png;base64,${logo}`}/>
            }
            <div className={c.service_name} style={{marginBottom: logo ? '10px' : 'none'}}>{service}</div>
        </div>

    // const children = () =>
    // <>
    //     <div className={c.service_cell}>
    //         {
    //             logo && <img className={c.service_logo} alt={service} src={`data:image/png;base64,${logo}`}/>
    //         }
    //         <div className={c.service_name} style={{marginBottom: logo ? '10px' : 'none'}}>{service}</div>
    //     </div>
    //     {
    //         intermodal &&
    //         <>
    //             <div className={c.service_plus}>+</div>
    //             <div className={c.service_cell}>
    //                 {
    //                     intermodalLogo && <img className={c.service_logo} alt={terminal} src={`data:image/png;base64,${intermodalLogo}`} />
    //                 }
    //                 <div className={c.service_name} style={{marginBottom: logo ? '10px' : 'none'}}>{terminal}</div>
    //             </div>
    //         </>
    //     }
    // </>

    // const outElement = () => {
    //     if (intermodal) return <div className={c.service_cell_wrapper}>{children()}</div>
    //     return children()
    // }

    if (asDiv) return <div ref={ref}>{oldChildren()}</div>
    return <td ref={ref}>{oldChildren()}</td>
}