import React, { useState, useEffect, useRef } from 'react'
import st from 'styles/UserSpace/ClientsPage/simple_select.module.css'

export const SimpleSelect = ({
    text='Сортировать по:',
    options=[""],
    value,
    setNewValue
}) => {
    const [opened, setOpened] = useState(false)
    const mainRef = useRef()

    useEffect(() => {
        const docClickListener = () => setOpened(false)
        document.addEventListener('click', docClickListener)
        mainRef.current.addEventListener('mouseenter', () => 
            document.removeEventListener('click', docClickListener)
        )
        mainRef.current.addEventListener('mouseleave', () =>
            document.addEventListener('click', docClickListener)
        )
        return () => {
            document.removeEventListener('click', docClickListener)
        }
    }, [])

    return (
        <div className={st.simple_select_container} ref={mainRef}>
            <span className={st.simple_select_text}>{text}</span>
            <div className={st.simple_select}>
                <div
                    className={st.simple_select_result}
                    onClick={() => setOpened(prev => !prev)}
                >
                    {value}
                    &nbsp;
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            fontSize: 10,
                            marginBottom: 2,
                            transform: opened ? 'rotateZ(180deg)' : '',
                            transition: 'transform .2s ease-in-out'
                            
                        }}
                    >&#9660;</div>
                </div>
                <div
                    className={st.simple_select_options + (opened ? ` ${st.options_active}` : '')}
                >
                    {
                        options.map(
                            op => <div
                                key={op}
                                className={st.simple_option}
                                onClick={() => {
                                    setNewValue(op)
                                    setOpened(false)
                                }}
                            >{op}</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}