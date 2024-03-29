import React from 'react'
import { useGlobalContext } from 'Context'
import { SimpleTextInput } from 'components/UserSpace/SimpleTextInput'
import { SimpleSelect } from 'components/UserSpace/SimpleSelect'
import st from 'styles/UserSpace/ArchivePage/heading.module.css'

import { UserspaceLocale } from 'locales'

import loupeIcon from 'assets/userspace/loupe_icon.svg'

export const Heading = ({ filters, setFilters }) => {
  const { locale } = useGlobalContext()
  const filtersHandler = ({ target: {name, value} }) => setFilters(prev => ({ ...prev, [name]: value }))

  return (
    <div className={st.heading}>
      <h1>{UserspaceLocale['архив_отправленных_вами_заявок'][locale]}</h1>
      <div className={st.filters}>
        <div className={st.search}>
          <SimpleTextInput
            name='search'
            placeholder='Поиск'
            icon={loupeIcon}
            value={filters.search}
            onChange={filtersHandler}
            bold
          />
        </div>
        <div className={st.sort_by}>
          <SimpleSelect
            options={['Дате', 'Пункту отправления']}
            value={filters.sort}
            setNewValue={val => {
              const fakeEvent = {
                target: {
                  name: 'sort',
                  value: val
                }
              }
              filtersHandler(fakeEvent)
            }}
          />
        </div>
      </div>
    </div>
  )
}
