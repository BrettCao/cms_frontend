import React, {Component} from 'react';
import { Input, Icon } from 'antd';
import styles from  './header.module.css';
import Router from 'next/router';

const Tabs = [{
    id: '11',
    title: '学术期刊',
}, {
    id: '11',
    title: '专著出书',
}, {
    id: '11',
    title: '其他纸媒',
}, {
    id: '11',
    title: '线上媒体',
}, {
    id: '11',
    title: '论文范文',
}, {
    id: '11',
    title: '应用文',
}, {
    id: '11',
    title: '资料下载'
}];

// export const Tabs = ({data}) => (
//     <ul>
//
//     </ul>
// );

class Header extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            current: Tabs[0],
            value: ''
        }

    }



    render()
    {
        return (
            <div className={styles.header}>
                <div className="container-sm show-body">
                    <img className={styles.lgo} src="/static/image/logo.png"/>
                    <div>
                        <div>
                            <ul>
                                {Tabs.map((item, key) => (
                                    <li className={[
                                        this.state.current === item?'active':''
                                    ].join(' ')} onClick={() => {console.log(item);this.setState({current: item})}} key ={key}>
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Input size="large" onChange={e => this.setState({value: e.target.value})} addonBefore={<Icon type="search" />}  addonAfter={<span onClick={(value) => Router.push({pathname: '/Search', query:{value:this.state.value}})} >搜索</span>} placeholder ="输入关键字搜索" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;