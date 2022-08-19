import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from 'Context'
import lottie from 'lottie-web'
import c from 'styles/components/loader.module.css'

import waveIcon from 'assets/panel/tabspanel/fraxt_icon.svg'
import trainIcon from 'assets/panel/tabspanel/jd_icon.svg'
import crossIcon from 'assets/panel/tabspanel/cross_icon.svg'
import autoIcon from 'assets/panel/tabspanel/auto_icon.svg'
import givenIcon from 'assets/panel/tabspanel/given_icon.svg'

import { PanelLocale } from 'locales'

export const Loader = () => {
    const animRef = useRef(null)
    const { locale } = useGlobalContext()

    useEffect(() => {
        if (animRef.current){
            lottie.loadAnimation({
                container: animRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('assets/animations/container.json')
            })
        }
    }, [])

    return (
        <div className={c.loader_page}>
            <div className={c.loader_container}>
                <div className={c.loader_container_img_container}>
                    <div className={c.loader_container_img} ref={animRef}></div>
                </div>
                <div className={c.loader_text}>
                    {PanelLocale['загрузка'][locale]}<p>.</p><p>.</p><p>.</p>
                </div>
                <div className={c.loader_icons}>
                    <img className={c.loader_wave_icon} src={waveIcon} alt="wave icon" />
                    <img className={c.loader_train_icon} src={trainIcon} alt="train icon" />
                    <img className={c.loader_cross_icon} src={crossIcon} alt="cross icon" />
                    <img className={c.loader_auto_icon} src={autoIcon} alt="auto icon" />
                    <img className={c.loader_given_icon} src={givenIcon} alt="given icon" />
                </div>
            </div>
        </div>
    )
}
