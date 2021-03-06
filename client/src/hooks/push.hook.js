import { useCallback } from 'react'
import { toast } from 'materialize-css'
import c from '../styles/components/push.module.css'

export const usePush = () => useCallback((messages, ok=false) => {
    if (messages){
        if (typeof messages === 'string'){
            toast({ html: messages, classes: ok ? c.success_push : c.error_push })
        } else {
            messages.forEach(mess => {
                toast({ html: mess, classes: ok ? c.success_push : c.error_push })
            })
        }
    }
}, [])
