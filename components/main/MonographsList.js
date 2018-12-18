/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';
import {Row, Col} from 'antd';

const MonographsList = ({List}) => (
    <Row className="row">
        {List.map((item, i) => (
            <Col span={4} style={{padding: '0 5px'}} key={i}>
                <img src={item.url} style={{width: '100%', cursor: 'pointer'}} className="img-responsive"/>
            </Col>
        ))}
    </Row>
);
export default MonographsList;