import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { usePanelContext } from 'Context'
import c from 'styles/UserSpace/pdf_reader.module.css'

export const PdfReader = ({ name, data }) => {
    const { setPdf } = usePanelContext()

    const bytes = atob(data)
    let length = bytes.length
    let out = new Uint8Array(length)

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    const url = URL.createObjectURL(new Blob([out], { type: 'application/pdf' }));

    return (
        <div className={c.pdf_reader_area}>
            <div className={c.pdf_reader_container}>
                <div className={c.pdf_reader_close} onClick={() => setPdf(null)}>&times;</div>
                <div className={c.pdf_reader_name}>{name}</div>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'>
                    <Viewer fileUrl={url} />
                </Worker>
            </div>
        </div>
    )
}