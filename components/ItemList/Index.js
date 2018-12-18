import React from 'react';
import {Button} from 'antd';
import {EmptyModule} from '../EmptyModule';
import {QQ, PQQ} from '../config';
const createMarkup = (html)  => {
    return {__html: html};
}
export const ItemList = ({list}) => (
    <section className="monographs-list-body">
        {list.length>0?list.map((item, i) => (
            <article key={`article-${i}`} className="item">
                <div className="img-wrapper">
                    <img src={item.url}/>
                </div>
                <div className="item-right">
                    <div style={{flex: 1, paddingLeft: '20px', paddingRight: '10px'}}>
                        <h3>{item.title} <span className="en">{item.en_title}</span></h3>
                        <div className="item-content" dangerouslySetInnerHTML={createMarkup(item.content)}></div>
                    </div>
                    <div className="btns-wrapper">
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`} type="primary">我要发表</Button>
                        <Button onClick={() => window.location.href=`http://wpa.qq.com/msgrd?v=3&uin=${PQQ}&site=qq&menu=yes`}>咨询客服</Button>
                    </div>
                </div>
            </article>
        )):EmptyModule}
    </section>
)