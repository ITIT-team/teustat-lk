import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-moment'
import 'chartjs-adapter-date-fns'
import { dataToGraphicConverter } from 'utils/panel/dataToGraphicConverter'
import { GRAPHIC_INITIALIZE_OPTIONS } from 'constants/PanelConstants'

import s from 'styles/Graphic/GraphicContainer/main.module.css'

ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend)

export const GraphicsContainer = ({ datasets }) => {
  
  return (
    <div className={s.graphic_container}>
      <Line
        options={GRAPHIC_INITIALIZE_OPTIONS}
        height={600}
        data={dataToGraphicConverter(datasets)}
      />
    </div>
  )
}
