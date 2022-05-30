import React, { useState, useRef } from 'react'
import icon from 'assets/userspace/generate_icon.svg'
import st from 'styles/samples/generate_icon.module.css'

export const GenerateIcon = ({ onClick=()=>{} }) => {
    const [rot, setRot] = useState(0)
    const arrowRef = useRef()
    const rotateHandler = () => {
        if (arrowRef){
            arrowRef.current.style.transition = 'transform .2s ease-in-out'
            arrowRef.current.style.transform = `rotate(${rot + 360}deg)`
            setRot(prev => prev + 360)
        }
    }
    return (
        <div className={st.generate_icon} onClick={() => {
            onClick()
            rotateHandler()
        }}>
            <img src={icon} alt='icon' ref={arrowRef}/>
        </div>
    )
}
