import React from 'react'

import {
  DepartureAndDestinationCell,
  ContainerSizeCell,
  ContainerOwnerCell,
} from 'components/PanelPage/Table/Cells'
import { ToggleSwitch } from 'components/Global'
import { TrashIcon } from 'components/UserSpace/TrashIcon'
import { Cell } from './Cell'

import { ReactComponent as RewriteIcon } from 'assets/userspace/rewrite_icon.svg'
import { ReactComponent as CopyIcon } from 'assets/main/copy_icon.svg'
import s from 'styles/Graphic/GraphicTools/dataset.card.module.css'

export const OneLineCard = ({
  dataset,
  onDeleteDataset=()=>{},
  onRewriteDataset=()=>{},
  onHideDataset=()=>{},
  onCopyDataset=()=>{},
}) => {
  return (
    <tr className={s.card}>
      <DepartureAndDestinationCell
        depCity={dataset.cityFrom.city}
        desCity={dataset.cityTo.city}
        departureCityCountry={dataset.cityFrom.country}
        destinationCityCountry={dataset.cityTo.country}
        customMargin='0 0 0 35px'
      />
      <Cell>
        {dataset.service.service}
        { dataset.terminal && ` + ${dataset.terminal}` }
      </Cell>
      <ContainerSizeCell size={dataset.containerSize} />
      <ContainerOwnerCell containerOwner={dataset.containerOwner} />
      <Cell>
        {dataset.rateType} НДС {dataset.rateType === 'Каботаж' ? '20%' : '0%'}
      </Cell>
      <Cell>
        <div className={s.color_cell} style={{ backgroundColor: dataset.datasetColor }} />
      </Cell>
      <Cell>
        <div className={s.clickable_icon} onClick={onRewriteDataset}>
          <RewriteIcon />
        </div>
      </Cell>
      <Cell>
        <ToggleSwitch
          name='Dataset Deactivate'
          value={dataset.hidded}
          onChange={({ target: { checked } }) => onHideDataset(checked)}
        />
      </Cell>
      <Cell>
        <div className={s.clickable_icon} onClick={() => onCopyDataset(dataset)}>
          <CopyIcon />
        </div>
      </Cell>
      <Cell>
        <TrashIcon onClick={onDeleteDataset} />
      </Cell>
    </tr>
  )
}
