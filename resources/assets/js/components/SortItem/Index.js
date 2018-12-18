import React from 'react';
import './index.module.css';

export const SortItem = ({items, store}) => (
    <ul className="popover-sort">
        {items.map((item, i)=>(
            <li className={[
                store.sort&&store.sort.id == item.id?'active':''
            ].join(' ')} key={i} onClick={()=>{store.changeSort(item)}}>
                {item.title}
            </li>
        ))}
    </ul>
);