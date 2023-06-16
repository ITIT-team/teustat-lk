import React, { useState } from 'react'
import { INITIAL_MY_RATES_TABS_STATE, TAB_ID } from 'constants/PanelConstants'
import { Button, TabsPanel } from 'components/Global'
import { SimpleSelect } from 'components/UserSpace/SimpleSelect'
import { Cards } from './Cards'
import { CreateNewRate } from './CreateNewRate'

import { ReactComponent as SettingIcon } from 'assets/userspace/settings_icon.svg'
import s from 'styles/UserSpace/MyRatesPage/main.module.css'

export const MyRatesPage = () => {
  const [tabs] = useState(INITIAL_MY_RATES_TABS_STATE)
  const [activetab, setActivetab] = useState(TAB_ID.FOBFOR)
  const [sortBy, setSortBy] = useState('Дате обновления')
  const [showForm, setShowForm] = useState(false)

  const HeaderPanel = () => {
    return (
      <>
        {
          showForm ?
          <div className={s.header_breadcrumb_container} onClick={() => setShowForm(false)}>
            <div className={s.breadcrumb}>
              <div className={s.breadcrumb_text}>Мои ставки /&nbsp;</div>
              <div className={s.breadcrumb_text}>Страница ставки</div>
            </div>
            <h3 className={s.breadcrumb_heading}>Внести новые ставки</h3>
          </div>
          :
          <div className={s.header_panel}>
            <div className={s.header_panel_buttons}>
              <div
                className={s.setting_icon_wrapper}
                data-prompt-text-black='Настройки'
              >
                <SettingIcon className={s.setting_icon} />
              </div>
              <h1>Мои ставки</h1>
              <Button
                style={{
                  marginLeft: 30
                }}
                onClick={() => setShowForm(true)}
              >
                + Добавить новые
              </Button>
            </div>
            <SimpleSelect
              text="Сортировать по"
              value={sortBy}
              options={[
                'Дате обновления',
                'Валидности'
              ]}
              setNewValue={setSortBy}
            />
          </div>
        }
        <TabsPanel
          tabs={tabs}
          activetab={activetab}
          setActivetab={setActivetab}
          union={true}
        />
      </>
    )
  }

  return (
    <div className={s.my_rates_page_container}>
      <HeaderPanel />
      {
        showForm ?
        <CreateNewRate activetab={activetab} />
        :
        <Cards />
      }
    </div>
  )
}
