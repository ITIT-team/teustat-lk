import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MobileAppScreen } from './MobileAppScreen'
import { Router } from './Router'
import { GlobalContext } from 'Context'
import { useHttp } from 'hooks'
import { BlurBall } from 'components/Global/BlurBallSample'
import { Loader } from 'components/Global/Loader'
import { ModalConfirm } from 'components/Global/ModalConfirm'

export const App = () => {
  const { request, loading } = useHttp()
  const [userData, setUserData] = useState(localStorage.getItem('userData') || null)
  const [locale, setLocale] = useState(localStorage.getItem('userLocale') || 'ru')
  const [modal, setModal] = useState(null)
  const router = Router(userData)

  useEffect(() => {
    (async () => {
      try {
        if (!['/private-archive', '/trial-panel'].includes(window.location.pathname)){
          const data = await request('/auth/passive_authorization')
          setUserData(data)
        }
      } catch (e) {
        setUserData(null)
        console.warn(e)
      }
    })()
  }, [ request ])

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData))
      if (userData.userId) {
        window.gtag('config', 'G-ZMWS2HGFPM', {
          user_id: userData.userId,
          debug_mode: false,
        })
        window.gtag('set', 'user_properties', {
          user_email: userData.email,
        })
      }
    } else {
      localStorage.removeItem('userData')
    }
  }, [userData])

  useEffect(() => {
    if (locale) {
      localStorage.setItem('userLocale', locale)
    }
  }, [locale])

  const showConfirm = ({ message, submitFunc }) =>
    setModal({ message, submitFunc })

  return window.innerWidth > 1024 ? (
    <GlobalContext.Provider value={{
      userData,
      setUserData,
      showConfirm,
      locale,
      setLocale,
    }}>
      <BrowserRouter>
        {
          loading ?
          <Loader />
          :
          <>
            { router }
            <BlurBall />
          </>
        }
        {
          modal
          &&
          <ModalConfirm
            message={modal.message}
            submitFunc={modal.submitFunc}
            closeFunc={() => setModal(null)}
          />
        }
      </BrowserRouter>
    </GlobalContext.Provider>
  ) : <MobileAppScreen />
}
