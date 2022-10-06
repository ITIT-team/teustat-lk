import React, { useState } from 'react'
import { Heading } from './Heading'
import { Content } from './Content'
import st from 'styles/UserSpace/ArchivePage/main.module.css'

export const ArchivePage = () => {
  const [filters, setFilters] = useState({
    search: '', sort: 'Дате'
  })

  return (
    <div className={st.archive_area}>
      <Heading filters={filters} setFilters={setFilters} />
      <Content />
    </div>
  )
}
