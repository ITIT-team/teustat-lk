import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { Context } from './Context'
import { useHttp } from './hooks/http.hook'
import { usePush } from './hooks/push.hook'
import { BlurBall } from './samples/BlurBallSample'

export const App = () => {
  const { request, loading, errors } = useHttp()
  const push = usePush()
  const [login] = useState(false)
  const router = Router(login)

  useEffect(() => push(errors), [ errors, push ])

  return (
    <Context.Provider value={{ request, loading }}>
      <BrowserRouter>
        <div className="container">
          { router }
        </div>
        <BlurBall />
      </BrowserRouter>
    </Context.Provider>
  )
}
