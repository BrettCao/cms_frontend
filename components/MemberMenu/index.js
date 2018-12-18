import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './index.module.css';
import {Divider } from 'antd';
import Link from 'next/link';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        // const paths = this.props.match.path.split('/');
        // member.setItemMenu(paths[paths.length-1]);

    }

    state = {
        current: 'member'
    }
    componentDidMount() {
        const href = window.location.href;
        let str = 'member';
        if(href.includes('Member')) {
            str = "member";
        } else if(href.includes('Password')) {
            str = "password"
        } else if(href.includes('Mobile')){
            str = "mobile";
        } else {
            str = 'forum';
        }
        this.setState({
            current: str
        })
    }

    render() {
        const {current} = this.state;
        return (
            <div>
                <ul className="member-menu">
                    <li className={[
                        current === 'member'?'active': ''
                    ].join(' ')}>
                        <Link href="/Member"><a href="javascript: void(0)">个人信息</a></Link>
                    </li>
                    <li  className={[
                        current === 'password'?'active': ''
                    ].join(' ')}>
                        <Link href="/Password"><a href="javascript: void(0)">修改密码</a></Link>
                    </li>
                    <li className={[
                        current === 'mobile'?'active': '',
                        'mobile'
                    ].join(' ')}>
                        <Link href="/Mobile"><a href="javascript: void(0)"><span>换绑手机</span></a></Link>
                    </li>

                    <li className={[
                        current === 'forum'?'active': '',
                    ].join(' ')}>
                        <Link href="/MyForum"><a href="javascript: void(0)"><span>参与话题</span></a></Link>
                    </li>

                </ul>
            </div>
        )
    }
}

export default Index;