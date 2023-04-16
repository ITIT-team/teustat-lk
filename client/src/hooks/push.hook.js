import { useCallback } from 'react'
import { captureException } from '@sentry/react'
import { toast } from 'materialize-css'
import c from '../styles/components/push.module.css'

export const usePush = () => useCallback(({ messages, ok=false, err={}}) => {
    if (messages){
        if (typeof messages === 'string'){
            toast({ html: messages, classes: ok ? c.success_push : c.error_push })
            
        } else {
            messages.forEach(mess => {
                toast({ html: mess, classes: ok ? c.success_push : c.error_push })
            })
        }
    }

    if (!ok && err) captureException(err)
}, [])
