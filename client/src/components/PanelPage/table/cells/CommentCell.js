import React, { useRef, useEffect } from 'react'
import c from 'styles/PanelPage/table/table.module.css'

export const CommentCell = ({ comments, opened, checkWidth=false }) => {
    const ref = useRef()

    useEffect(() => {
        if (ref.current && checkWidth){
            checkWidth(ref.current.offsetWidth)
        }
    }, [checkWidth])

    return (
        <td ref={ref}>
            <div className={c.comment_cell}>
                <div className={c.comment_text + (opened ? ` ${c.full_comment}` : '')}>{comments}</div>
                <div className={c.comment_arrow_container}>
                    <div className={c.comment_arrow + (opened ? ` ${c.comment_arrow_opened}` : '')}></div>
                </div>
            </div>
        </td>
    )
}