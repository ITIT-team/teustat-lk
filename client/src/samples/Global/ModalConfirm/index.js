import React from 'react'
import st from 'styles/samples/modal_confirm.module.css'

export const ModalConfirm = ({ message, submitFunc, closeFunc }) => {
    const submitHandler = () => {
        submitFunc()
        closeFunc()
    }
    return (
        <div className={st.page_container}>
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
        </div>
    )
}
