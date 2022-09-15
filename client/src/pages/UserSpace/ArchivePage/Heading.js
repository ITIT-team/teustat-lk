import React from 'react'
import { SimpleTextInput } from 'components/UserSpace/SimpleTextInput'
import { SimpleSelect } from 'components/UserSpace/SimpleSelect'
import st from 'styles/UserSpace/ArchivePage/heading.module.css'

import loupeIcon from 'assets/userspace/loupe_icon.svg'

export const Heading = ({ filters, setFilters }) => {
  const filtersHandler = ({ target: {name, value} }) => setFilters(prev => ({ ...prev, [name]: value }))

  return (
    <div className={st.heading}>
      <h1>Архив заявок</h1>
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