'use strict';
import React from 'react';
import './periodical-list.module.css';

const PeriodicalList = ({List}) => (
    <section className="row periodical-list-view">
        {List.map((item, key)=> (
            <article className="col-md-2" key={key}>
                <img onClick={(item) => {
                    //#code
                    console.log(item.src);
                }
                } src={item.uri}/>
            </article>
        ))}
    </section>
);

export default PeriodicalList;