import React from 'react';
import {Button} from 'antd';

export const ItemList = ({list}) => (
    <section className="monographs-list-body">
        {list.map((item, i) => (
            <article key={`article-${i}`} className="item">
                <div className="img-wrapper">
                    <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=980788966,1230118886&fm=58&s=6698A62B3EDE1FE909A0CBC60300A0B6"/>
                </div>
                <div className="item-right">
                    <div style={{flex: 1, paddingLeft: '20px', paddingRight: '10px'}}>
                        <h3>中心出版折 <span className="en">english</span></h3>
                        <div className="item-content">content</div>             
                    </div>                
                    <div className="btns-wrapper">
                        <Button type="primary">我要发表</Button>
                        <Button>咨询客服</Button>
                    </div>
                </div>
            </article>
        ))}
    </section>
)