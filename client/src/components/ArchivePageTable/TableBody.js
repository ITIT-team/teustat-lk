import React from 'react'
import {
  DateCell,
  DepartureAndDestinationCell,
  ContainerOwnerCell,
  ContainerSizeCell,
  TypeUnitCell,
  ServiceCell,
  RateCell,
  NdsCell,
  GroupageRateCell
} from 'components/PanelPage/Table/Cells'

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
                return setMarkedRecords(prev => prev.filter(markedId => markedId !== r.id))
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
              service={(category === 'Сквозной сервис' && r.terminal !== '') ? `${r.service} + ${r.terminal}` : r.service }
              logo={r.serviceLogo}
            />
            {
              category === 'Сборный груз' ?
              <GroupageRateCell
                rate={r.rate}
                rateUSD={r.rateUSD}
                currency={r.currency}
                betType={r.betType}
                interval={r.interval}
                style={{
                  width: 200,
                  margin: '0 auto'
                }}
                showZero
              />
              :
              <RateCell
                rate={r.rate}
                rateUSD={r.rateUSD}
                currency={r.currency || 'руб.'}
                withEnvelop={false}
                showZero
              />
            }
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
