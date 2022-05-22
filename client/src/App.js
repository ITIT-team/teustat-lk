import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { Context } from './Context'
import { useHttp } from 'hooks'
import { BlurBall } from './samples/BlurBallSample'
import { Loader } from 'samples/Loader'

export const App = () => {
  const { request, loading } = useHttp()
  const [userData, setUserData] = useState(null)
  const router = Router(userData)

  useEffect(() => {
    (async () => {
      try {
        const data = await request('/auth/passive_authorization')
        setUserData(data)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [ request ])

  return (
    <Context.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        {
          loading ?
          <Loader />
          :
          router
        }
        <BlurBall />
      </BrowserRouter>
    </Context.Provider>
  )
}
