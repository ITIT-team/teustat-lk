import React from 'react'
import { TAB_ID } from 'constants/PanelConstants'
import { FobForForm } from './FobForForm'
import { FreightForm } from './FreightForm'
import { RailwayForm } from './RailwayForm'
import { DeliveryForm } from './DeliveryForm'
import { AutoForm } from './AutoForm'

import { ReactComponent as CopyIcon } from 'assets/main/copy_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/userspace/trash_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/form.module.css'

const dataLayer = {
  [TAB_ID.FOBFOR]: <FobForForm />,
  [TAB_ID.FREIGHT]: <FreightForm />,
  [TAB_ID.RAILWAY]: <RailwayForm />,
  [TAB_ID.DELIVERY]: <DeliveryForm />,
  [TAB_ID.AUTO]: <AutoForm />,
}

export const CreateNewRate = ({ activetab }) => {
  return (
    <div className={s.container}>
      <div className={s.duplicate}>
        Новые ставки
        <div className={s.duplicate_btn}>+</div>
      </div>
      <div className={s.form_card}>
        <div className={s.card_utils}>
          <div className={s.util_btn}>
            <CopyIcon />
          </div>
          <div className={s.util_btn}>
            <TrashIcon />
          </div>
        </div>
        { dataLayer[activetab] }
      </div>
    </div>
  )
}
