/**
 * Created by Smile on 2018/4/11.
 */
import React, {Fragment} from 'react';
import styles from './tool.module.css';
import Link from 'next/link';
import {auth} from '../../components/Auth';
import {observer} from 'mobx-react';

import Bell from '../Bell';


@observer
class Tool extends React.Component{
    render() {
       return (
           <div className="component">
                <ul>
                    {!!!auth.login?<Fragment>
                        <li className = "register">注册</li>
                        <li className = "login"><Link href="/Login"><a href="javascript: void (0)">登录</a></Link></li>
                    </Fragment>: <Fragment>
                        <Link href="/Member"><li><img className="float-right" style={{width: 32, height: 32}} src="/static/image/face.png"/></li></Link>
                        <li><Bell/></li>
                    </Fragment>}
                    <li>|</li>
                    <li><a target="_blank" href="http://www.fabiaoba.com/">返回旧版</a></li>
                    <li><Link href="/Forum"><a href="javascript: void(0)">微社区</a></Link></li>
                    <li><Link href="/Sense"><a href="javascript:void(0)">发表常识</a></Link></li>
                    <li><Link href="/Forum"><a href="javascript: void (0)">发表计划</a></Link></li>
                    <li><Link href="/index"><a href="javascript: void(0)">首页</a></Link></li>
                </ul>
        </div>
       )
    }
}


export default Tool;