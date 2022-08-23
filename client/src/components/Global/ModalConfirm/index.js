import React, { useState } from 'react'
import { TailSpin } from '@agney/react-loading'
import { BlurPage } from 'components/Global/BlurPage'
import st from 'styles/components/modal_confirm.module.css'

export const ModalConfirm = ({ message, submitFunc, closeFunc }) => {
    const [loading, setLoading] = useState(false)

    const submitHandler = async() => {
        setLoading(true)
        await submitFunc()
        setLoading(false)
        closeFunc()
    }

    return (
        <BlurPage>
            {
                loading ?
                <TailSpin height='20vh' />
                :
                <div className={st.confirm_container}>
                    <div
                        className={st.confirm_close}
                        onClick={closeFunc.bind(this)}
                    >&times;</div>
                    <div className={st.confirm_message}>{message}</div>
                    <div className={st.confirm_buttons_container}>
                        <div
                            className={st.cancel_btn}
                            onClick={closeFunc.bind(this)}
                        >Отмена</div>
                        <div
                            className={st.submit_btn}
                            onClick={submitHandler.bind(this)}
                        >Подтвердить</div>
                    </div>
                </div>
            }
        </BlurPage>
    )
}
