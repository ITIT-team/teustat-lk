import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import st from 'styles/components/language.module.css'

import RuFlag from 'assets/languagechanger/ru_flag.svg'
import EnFlag from 'assets/languagechanger/en_flag.svg'
import ChiFlag from 'assets/languagechanger/chi_flag.svg'

export const LanguageSetter = ({ toUp=true }) => {
  const { locale, setLocale } = useGlobalContext()
  const [opened, setOpened] = useState(false)
  const mainRef = useRef()

  useEffect(() => {
      const docClickListener = () => setOpened(false)
      document.addEventListener('click', docClickListener)
      mainRef.current.addEventListener('mouseenter', () => 
          document.removeEventListener('click', docClickListener)
      )
      mainRef.current.addEventListener('mouseleave', () =>
          document.addEventListener('click', docClickListener)
      )
      return () => {
          document.removeEventListener('click', docClickListener)
      }
  }, [])

  const localesData = {
    ru: {
      name: 'RU',
      flag: RuFlag,
      setter: setLocale.bind(this, 'ru')
    },
    en: {
      name: 'ENG',
      flag: EnFlag,
      setter: setLocale.bind(this, 'en')
    },
    chi: {
      name: 'CN',
      flag: ChiFlag,
      setter: setLocale.bind(this, 'chi')
    }
  }

  const langVariants = () => {
    return (
      <div className={st.language_variants} style={{ height: opened ? 110 : 0 }}>
        { Object.keys(localesData).filter(k => k !== locale).map(k => 
          <div
            key={localesData[k].name}
            className={st.language_container}
            onClick={localesData[k].setter}
            style={{
              marginBottom: toUp ? 5 : 0,
              marginTop: toUp ? 0 : 5
            }}
          >
            <img src={localesData[k].flag} alt={localesData[k].name} />
            <div className={st.language_name}>{localesData[k].name}</div>
            <div className={st.arrow_container}></div>
          </div>
        ) }
      </div>
    )
  }

  return (
    <>
      { toUp && langVariants() }
      <div className={st.language_container} onClick={() => setOpened(prev => !prev)} ref={mainRef}>
        <img src={localesData[locale].flag} alt={localesData[locale].name} />
        <div className={st.language_name}>{localesData[locale].name}</div>
        <div className={st.arrow_container}>
          <div className={st.arrow} style={{
            transform: opened ? 'rotate(225deg)' : 'rotate(45deg)',
            marginBottom: opened ? 0 : 6
          }}></div>
        </div>
      </div>
      { !toUp && langVariants() }
    </>
  )
}
