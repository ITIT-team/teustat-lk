import React from 'react'
import c from 'styles/PanelPage/thumblersrow.module.css'

export const ThumblersRow = ({
    rowName = '',
    thumblersData = [
        { key: '', name: '', filterValue: true, disabled: false }
    ],
    withAllOption = true,
    setFilter = () => {}
}) => <>
    <div className={c.row_name}>{rowName}</div>
    <div className={c.thumblers_row}>
        {
            withAllOption
            &&
            <div
                className={c.thumbler + (thumblersData.map(data => data.filterValue).includes(true) ? '' : ` ${c.active_thumbler}`)}
                onClick={() => {
                    let changesData = {}
                    thumblersData.forEach(data => {
                        changesData[data.key] = false
                    })
                    setFilter(changesData)
                }}
            >Все</div>
        }
        {
            thumblersData.map(data => {
                return <div
                    key={data.key}
                    className={c.thumbler + (data.filterValue ? ` ${c.active_thumbler}` : '')}
                    style={data.disabled ? { textDecoration: 'line-through', color: 'gray' } : {}}
                    onClick={data.disabled ? null : () => {
                        let changesData = {}
                        thumblersData.forEach(d => {
                            if (d.key === data.key) changesData[d.key] = true
                            else changesData[d.key] = false
                        })
                        setFilter(changesData)
                    }}
                >{data.name}</div>
            })
        }
    </div>
</>
