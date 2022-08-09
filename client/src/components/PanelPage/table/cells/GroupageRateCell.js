import React from 'react'
import { numberSplitter } from 'utils'
import c from 'styles/PanelPage/table/table.module.css'

import { ReactComponent as TrainIcon } from 'assets/panel/table/groupage/gray_train_icon.svg'
import { ReactComponent as WavesIcon } from 'assets/panel/table/groupage/gray_waves_icon.svg'
import { ReactComponent as CrossIcon } from 'assets/panel/table/groupage/gray_cross_icon.svg'

const iconsMap = {
  'Фрахт': <WavesIcon style={{marginRight: 7}}/>,
  'ЖД': <TrainIcon style={{marginLeft: 7, marginRight: 13}}/>,
  'Сквозной сервис': <CrossIcon style={{marginLeft: 5, marginRight: 9}}/>
}

export const GroupageRateCell = ({
  rate,
  rateUSD,
  currency,
  betType,
  interval,
  showZero = false,
  showDetails = false,
  asDiv = false,
  roundedTop = false,
  roundedBottom = false,
}) => {
  const children = () => {
    if (rate !== ''){
      return (
        <div className={c.groupage_rate_cell} style={{
          borderTopLeftRadius: roundedTop ? 6 : 0,
          borderTopRightRadius: roundedTop ? 6 : 0,
          borderBottomLeftRadius: roundedBottom ? 6 : 0,
          borderBottomRightRadius: roundedBottom ? 6 : 0,
        }}>
          <div className={c.groupage_rate_price}>
            {iconsMap[betType]}
            {
              showZero ?
              <>
                {
                  currency === 'USD'
                  ?
                  `${numberSplitter(rateUSD.toString())} ${currency}`
                  :
                  `${numberSplitter(rate.toString())} ${currency}`
                }
              </>
              :
              <>
                {
                  currency === 'USD'
                  ?
                  <>
                    { rateUSD !== 0 && `${numberSplitter(rateUSD.toString())} ${currency}` }
                  </>
                  :
                  <>
                    { rate !== 0 && `${numberSplitter(rate.toString())} ${currency}` }
                  </>
                }
              </>
            }
          </div>
          {
            showDetails ?
            <div className={c.groupage_rate_show_details}>Смотреть детали...</div>
            :
            <div className={c.groupage_rate_interval}>
              {interval}
            </div>
          }
        </div>
      )
    }
  }

  if (asDiv) return <div>{children()}</div>
  return <td>{children()}</td>
}