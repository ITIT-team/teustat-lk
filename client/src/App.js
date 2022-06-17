import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { Context } from './Context'
import { useHttp } from 'hooks'
import { BlurBall } from 'components/Global/BlurBallSample'
import { Loader } from 'components/Global/Loader'
import { ModalConfirm } from 'components/Global/ModalConfirm'

export const App = () => {
  const { request, loading } = useHttp()
  const [userData, setUserData] = useState(localStorage.getItem('userData') || null)
  const [modal, setModal] = useState(null)
  const router = Router(userData)

  useEffect(() => {
    (async () => {
      try {
        const data = await request('/auth/passive_authorization')
        setUserData(data)
      } catch (e) {
        setUserData(null)
        console.warn(e)
      }
    })()
  }, [ request ])

  useEffect(() => {
    if (userData){
      localStorage.setItem('userData', JSON.stringify(userData))
    } else {
      localStorage.removeItem('userData')
    }
  }, [userData])

  const showConfirm = ({ message, submitFunc }) => setModal({ message, submitFunc })

  return (
    <Context.Provider value={{ userData, setUserData, showConfirm }}>
      <BrowserRouter>
        {
          loading ?
          <Loader />
          :
          router
        }
        <BlurBall />
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
    </Context.Provider>
  )
}
