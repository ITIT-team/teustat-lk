import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const request = useCallback(async (path, { method='POST', body=null }) => {
        try {
            setLoading(true)
            let headers = {}
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(path, { method, body, headers })
            const data = await response.json()
            if (!response.ok) throw new Error(data.errors)
            setLoading(false)
            return data
        } catch (errs) {
            setLoading(false)
            setErrors(errs)
            setErrors(null)
            throw e
        }
    }, [])

    return { request, loading, errors }
}