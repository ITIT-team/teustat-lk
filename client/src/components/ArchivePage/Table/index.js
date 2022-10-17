import React from 'react'
import { TableHead } from './TableHead'
import { TableBody } from './TableBody'
import st from 'styles/UserSpace/ArchivePage/content.module.css'

export const Table = ({ category, records, markedRecords, setMarkedRecords }) => {
  return (
    <div className={st.table_wrapper}>
      <h1>{category}</h1>
      <table>
        <TableHead category={category} />
        <TableBody
          records={records}
          category={category}
          markedRecords={markedRecords}
          setMarkedRecords={setMarkedRecords}
        />
      </table>
    </div>
  )
}
