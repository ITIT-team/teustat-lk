import React from 'react'
import { usePanelContext } from 'Context'
import c from 'styles/UserSpace/pdf_reader.module.css'

export const PdfReader = ({ name, data }) => {
    const { setPdf } = usePanelContext()
    return (
        <div className={c.pdf_reader_area}>
            <div className={c.pdf_reader_container}>
                <div className={c.pdf_reader_close} onClick={() => setPdf(null)}>&times;</div>
                <div className={c.pdf_reader_name}>{name}</div>
                <object
                    data={`data:application/pdf;base64,${data}`}
                    type="application/pdf"
                    className={c.pdf_reader_obj}
                    name={name}
                >
                    <embed
                        src={`data:application/pdf;base64,${data}`}
                        type="application/pdf"
                    ></embed>
                </object>
            </div>
        </div>
    )
}