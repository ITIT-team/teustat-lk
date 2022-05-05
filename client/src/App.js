import React, { useState } from 'react'
import { AuthPage } from './pages/AuthorizationPage/components'
import { BlurBall } from './samples/BlurBallSample'

export const App = () => {
  const [login] = useState(false)

  return (
    <>
      <div className="container">
        {
          login ? <div>Ты вошёл, нахуй пошёл</div> : <AuthPage />
        }
      </div>
      <BlurBall />
    </>
  )
}
