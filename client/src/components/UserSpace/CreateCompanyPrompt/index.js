import React, { useState, useRef, useEffect } from 'react'
import Inputmask from 'inputmask'
import { TailSpin } from '@agney/react-loading'
import { useHttp, usePush } from 'hooks'
import { useGlobalContext } from 'Context'
import st from 'styles/UserSpace/ClientsPage/create_company_prompt.module.css'

export const CreateCompanyPrompt = ({ onClose=()=>{}, companyType }) => {
    const { setUserData } = useGlobalContext()
    const [comp, setComp] = useState({
        name: '', subscribeEndDate: '', activated: true
    })
    const { request, loading } = useHttp()
    const push = usePush()
    const dateRef = useRef()

    const submitHandler = async () => {
        if (comp.name === ''){
            push('Заполните наименование клиента')
            return
        }
        try {
            await request('/api/add_company', { ...comp, companyType })
            const newUserData = await request('/auth/passive_authorization')
            setUserData(newUserData)
            setComp({ name: '', subscribeEndDate: '' })
            onClose()
            push(`Клиент ${comp.name} добавлен`, true)
        } catch (e) {
            push(e.message)
        }
    }

    useEffect(() => {
        if (dateRef.current){
            Inputmask({ mask: '99.99.9999' }).mask(dateRef.current)
        }
    }, [])

    return (
        <div className={st.page_container}>
            {
                loading ?
                <TailSpin height='20vh'/>
                :
                <div className={st.prompt_container}>
                    <div
                        className={st.prompt_close}
                        onClick={onClose}
                    >&times;</div>
                    <div className={st.prompt_content}>
                        <input
                            type='text'
                            value={comp.name}
                            onChange={e => setComp(prev => ({ ...prev, name: e.target.value }))}
                            placeholder='Наименование'
                        />
                        <input
                            ref={dateRef}
                            type='text'
                            value={comp.subscribeEndDate}
                            onChange={e => setComp(prev => ({ ...prev, subscribeEndDate: e.target.value }))}
                            placeholder='Окончание подписки'
                        />
                    </div>
                    <div className={st.prompt_buttons_container}>
                        <div
                            className={st.cancel_btn}
                            onClick={onClose}
                        >Отмена</div>
                        <div
                            className={st.submit_btn}
                            onClick={submitHandler}
                        >Подтвердить</div>
                    </div>
                </div>
            }
        </div>
    )
}