import React from 'react'
import { DateCell } from 'components/PanelPage/Table/Cells/DateCell'
import { DepartureAndDestinationCell } from 'components/PanelPage/Table/Cells/DepartureAndDestinationCell'
import { ContainerSizeCell } from 'components/PanelPage/Table/Cells/ContainerSizeCell'
import { ContainerOwnerCell } from 'components/PanelPage/Table/Cells/ContainerOwnerCell'
import { TypeUnitCell } from 'components/PanelPage/Table/Cells/TypeUnitCell'
import { ServiceCell } from 'components/PanelPage/Table/Cells/ServiceCell'
import { RateCell } from 'components/PanelPage/Table/Cells/RateCell'
import { NdsCell } from 'components/PanelPage/Table/Cells/NdsCell'

import st from 'styles/UserSpace/ArchivePage/content.module.css'

export const TableBody = ({ category, records, markedRecords, setMarkedRecords }) => {
  return (
    <tbody>
      {
        records.map(r =>
          <tr key={r.id}>
            <DateCell
              date={r.date}
              withRadio
              radioChecked={markedRecords.includes(r.id)}
              setRadioChecked={bool => {
                if (bool) return setMarkedRecords(prev => prev.concat(r.id))
                return setMarkedRecords(prev => prev.filter(rec => rec.id !== r.id))
              }}
            />
            <DepartureAndDestinationCell
              depCity={r.departureCity}
              desCity={r.destinationCity}
              departureCityCountry={r.departureCityCountry}
              destinationCityCountry={r.destinationCityCountry}
            />
            {
              category === 'Сборный груз' ?
              <TypeUnitCell typeUnit={r.typeUnit} />
              :
              <>
                <ContainerSizeCell
                  size={r.containerSize}
                />
                {
                  !['Автовывоз', 'Выдача'].includes(category) &&
                  <ContainerOwnerCell
                    containerOwner={r.containerOwner}
                  />
                }
              </>
            }
            <ServiceCell
              service={r.service}
              logo={r.serviceLogo}
            />
            <RateCell
              rate={r.rate}
              rateUSD={r.rateUSD}
              currency={r.currency || 'руб.'}
              withEnvelop={false}
              showZero
            />
            <NdsCell
              rateType={r.rateType}
              customNds={r.nds}
            />
          </tr>
        )
      }
    </tbody>
  )
}
