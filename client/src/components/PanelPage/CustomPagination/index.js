import React from 'react'
import Pagination from 'react-js-pagination'
import c from 'styles/PanelPage/Table/pagination.module.css'

export const CustomPagination = ({pagination, setPagination, count}) => 
<div className={c.pagination_container}>
    <div
        className={c.first_page + (pagination === 0 ? ` ${c.disabled_btn}` : '')}
        onClick={() => {
            if (pagination === 0) return
            setPagination(0)
        }}
    >«</div>
    <div
        className={c.previous_page + (pagination === 0 ? ` ${c.disabled_btn}` : '')}
        onClick={() => {
            if (pagination === 0) return
            setPagination(prev => prev - 1)
    }}>⟨</div>
    <Pagination
        activePage={pagination + 1}
        totalItemsCount={count}
        itemsCountPerPage={13}
        onChange={page => setPagination(page - 1)}
        pageRangeDisplayed={6}
        innerClass={c.pagination_numbers}
        itemClass={c.pagination_item}
        activeClass={c.pagination_item_active}
        linkClass={c.pagination_item_link}
        hideNavigation
        hideFirstLastPages
    />
    <div
        className={c.next_page + (pagination === Math.ceil( count / 13) - 1 ? ` ${c.disabled_btn}` : '')}
        onClick={() => {
            if (pagination === Math.ceil( count / 13 ) - 1) return
            setPagination(prev => prev + 1)
        }}
    >⟩</div>
    <div
        className={c.last_page + (pagination === Math.ceil( count / 13) - 1 ? ` ${c.disabled_btn}` : '')}
        onClick={() => {
            if (pagination === Math.ceil( count / 13 ) - 1) return
            setPagination(Math.ceil( count / 13 ) - 1)
        }}
    >»</div>
</div>