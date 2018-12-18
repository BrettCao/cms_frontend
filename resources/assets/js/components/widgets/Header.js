import React, {Component} from 'react';
import { Input, Select, Icon } from 'antd';
const Option = Select.Option;

import './header.module.css';

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
            current: Tabs[0]
        }

    }

    componentDidMount() {

    }

    render()
    {
        return (
            <div className="header">
                <div className="container-sm show-body">
                    <img className="lgo" src="desktop/image/logo.jpg"/>
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
                            <Input size="large" addonBefore={<Icon type="search" />} addonAfter={<span>搜索</span>} defaultValue="mysite" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;