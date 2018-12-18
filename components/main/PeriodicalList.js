'use strict';
import React, {Fragment} from 'react';
import  styles from './periodical-list.module.css';
import {Col,Row} from 'antd';
import Link from 'next/link';

const PeriodicalList = ({List}) => (
    <Fragment>
        {List.length>0?<Row className={[
            styles.periodicaListView
        ].join(' ')}>
            {List.map((item, key)=> (
                <Col span={4} key={key}>
                    <Link href={{ pathname: '/ShowPeriodical', query: { uuid: item.uuid } }}>
                        <figure style={{cursor: 'pointer'}}>
                            <img src={item.url}/>
                            <div>{item.title}</div>
                        </figure>
                    </Link>
                </Col>

            ))}
        </Row>:<div style={{padding:30, textAlign: 'center', minHeight: 300}}>暂无数据</div>}
    </Fragment>

);

export default PeriodicalList;