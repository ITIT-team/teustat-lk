import React, { useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { getFilePlugin } from '@react-pdf-viewer/get-file'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import { usePanelContext } from 'Context'
import { BlurPage } from 'components/Global'
import c from 'styles/UserSpace/pdf_reader.module.css'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const PdfReader = ({ name, data }) => {
    const { setPdf } = usePanelContext()
    const [url] = useState(() => {
        const bytes = atob(data)
        let length = bytes.length
        let out = new Uint8Array(length)
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
        return URL.createObjectURL(new Blob([out], { type: 'application/pdf' }))
    })

    const instanceOfFilenamePlugin = getFilePlugin({ fileNameGenerator: () => `[teustat] ${name}.pdf` })
    const instanceOfToolbarPlugin = toolbarPlugin()
    const { renderDefaultToolbar, Toolbar } = instanceOfToolbarPlugin
    const { DownloadButton } = instanceOfFilenamePlugin

    const renderToolbar = () => (
        <Toolbar>
            {
                renderDefaultToolbar(
                    slot => ({
                        ...slot,
                        Download: () => <DownloadButton />
                    })
                )
            }
        </Toolbar>
    )

    const instanceOfLayoutPlugin = defaultLayoutPlugin({
        sidebarTabs: defaultTabs => [ defaultTabs[0] ],
        renderToolbar
    })

    return (
        <BlurPage>
            <div className={c.pdf_reader_container} id='pdf_reader'>
                <div className={c.pdf_reader_close} onClick={() => setPdf(null)}>&times;</div>
                <div className={c.pdf_reader_name}>{name}</div>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
                    <Viewer
                        fileUrl={url}
                        plugins={[ instanceOfToolbarPlugin, instanceOfFilenamePlugin, instanceOfLayoutPlugin ]}
                    />
                </Worker>
            </div>
        </BlurPage>
    )
}
