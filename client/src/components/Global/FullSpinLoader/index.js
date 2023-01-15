import React from 'react'
import { TailSpin } from '@agney/react-loading'
import { BlurPage } from 'components/Global/BlurPage'

export const FullSpinLoader = ({ spinHeight='40%' }) => 
  <BlurPage>
    <TailSpin height={spinHeight} />
  </BlurPage>

