import React, { useState } from 'react'
import { AuthPage } from './pages/AuthorizationPage/components'
import { BlurBall } from './samples/BlurBallSample'

import { usePush } from './hooks/push.hook'

export const App = () => {
  const [login] = useState(false)
  const push = usePush()

  return (
    <>
      <div className="container">
        {
          login ? <div>Ты вошёл, нахуй пошёл</div> : <AuthPage />
        }
      </div>
      <button onClick={() => push(['Kekglfadkjglksfdjgslkfdjglskdfjglksdfjglksdfjglksdfjgklsdfj', 'Lol'], true)}>Push mess</button>
      <BlurBall />
    </>
  )
}
