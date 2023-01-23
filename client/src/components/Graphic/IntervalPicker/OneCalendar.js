import React from 'react'

import s from 'styles/components/interval.picker.module.css'

export const OneCalendar = ({
  calendarData = [
    {
      year: 2000,
      monthes: []
    }
  ],
  selectedYear = 2000,
  setSelectedYear = () => {},
  result = {
    from: new Date('2020-01-01'),
    to: new Date('2021-01-01')
  },
  setResult = () => {}
}) => {
  const isFirstYear = calendarData[0].year === selectedYear
  const isLastYear = calendarData[calendarData.length - 1].year === selectedYear

  const isSelected = (year, monthIndex) => {
    const currentDateStr = new Date(`${year}-${('00' + (monthIndex + 1)).slice(-2)}-01`).toLocaleDateString()
    const isFromDate = currentDateStr === result.from?.toLocaleDateString()
    const isToDate = currentDateStr === result.to?.toLocaleDateString()
    return isFromDate || isToDate
  }

  return (
    <div className={s.calendar_container}>
      <div className={s.years_slider}>
        <div
          className={s.years_slider_arrow}
          onClick={() => {
            if (isFirstYear) return
            setSelectedYear(prev => prev - 1)
          }}
          style={{
            cursor: isFirstYear ? 'default' : 'pointer'
          }}
        >
          {
            isFirstYear ?
            <>&nbsp;&nbsp;</>
            :
            <>&lt;</>
          }
        </div>
        <div className={s.selected_year}>{selectedYear}</div>
        <div
          className={s.years_slider_arrow}
          onClick={() => {
            if (isLastYear) return
            setSelectedYear(prev => prev + 1)
          }}
          style={{
            cursor: isLastYear ? 'default' : 'pointer'
          }}
        >
          {
            isLastYear ?
            <>&nbsp;&nbsp;</>
            :
            <>&gt;</>
          }
        </div>
      </div>
      <div className={s.monthes}>
        {
          calendarData.find(d => d.year === selectedYear).monthes.map((month, index) => (
            <div
              className={
                s.month + (isSelected(selectedYear, index) ? ` ${s.month_selected}` : '')
              }
              key={month}
              onClick={() => setResult(prev => {
                const pickedDate = new Date(`${selectedYear}-${('00' + (index + 1)).slice(-2)}-01`)
                if (prev.from?.toLocaleDateString() === pickedDate.toLocaleDateString()) {
                  prev.from = null
                  return { ...prev }
                }
                if (prev.to?.toLocaleDateString() === pickedDate.toLocaleDateString()) {
                  prev.to = null
                  return { ...prev }
                }
                if (!prev.from) {
                  if (prev.to < pickedDate) {
                    prev.from = prev.to
                    prev.to = pickedDate
                  } else {
                    prev.from = pickedDate
                  }
                  return { ...prev }
                }
                if (!prev.to) {
                  if (prev.from > pickedDate) {
                    prev.to = prev.from
                    prev.from = pickedDate
                  } else {
                    prev.to = pickedDate
                  }
                  return { ...prev }
                }
                if (pickedDate < prev.to) prev.from = pickedDate
                else if (pickedDate > prev.from) prev.to = pickedDate
                return { ...prev }
              })}
            >{month}</div>
          ))
        }
      </div>
    </div>
  )
}
