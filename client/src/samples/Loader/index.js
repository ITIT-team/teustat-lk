import React from 'react'
import c from 'styles/samples/loader.module.css'

import containerIcon from 'assets/loader/container_icon.svg'
import waveIcon from 'assets/loader/fraxt_icon.svg'
import trainIcon from 'assets/loader/jd_icon.svg'
import crossIcon from 'assets/loader/cross_icon.svg'
import autoIcon from 'assets/loader/auto_icon.svg'
import givenIcon from 'assets/loader/given_icon.svg'

export const Loader = () => (
    <div className={c.loader_page}>
        <div className={c.loader_container}>
            <img className={c.loader_container_img} src={containerIcon} alt="Teustat"/>
            <div className={c.loader_text}>
                Загрузка<p>.</p><p>.</p><p>.</p>
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