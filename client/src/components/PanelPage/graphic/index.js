import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
// import { Line } from 'react-chartjs-2'
// import { dataToGraphicConverter } from 'utils/panel/dataToGraphicConverter'
// import { GRAPHIC_INITIALIZE_OPTIONS } from 'constants/PanelConstants'
import c from 'styles/PanelPage/graphic/main.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const Graphic = ({ records }) => {
    // const { recordsMap, labels } = dataToGraphicConverter(records)
    return <div className={c.graphic_container}>
        {/* <Line options={GRAPHIC_INITIALIZE_OPTIONS} data={{ datasets: recordsMap, labels }} height={400}/> */}
    </div>
}