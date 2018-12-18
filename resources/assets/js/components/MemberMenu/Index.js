import React, {Component} from 'react';
import {member} from  '../../store/member';
import {observer} from 'mobx-react';
import './index.module.css';
import {history} from '../../config/history';
import {withRouter} from 'react-router-dom';
import {Divider } from 'antd';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        const paths = this.props.match.path.split('/');
        member.setItemMenu(paths[paths.length-1]);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <ul className="member-menu">
                    <li onClick={() => member.setItemMenu('member', ()=> history.push('/member'))} className={[
                        member.current === 'member'?'active': ''
                    ].join(' ')}>
                        个人信息
                    </li>
                    <li onClick={() => member.setItemMenu('password', ()=> history.push('/password'))} className={[
                        member.current === 'password'?'active': ''
                    ].join(' ')}>
                        修改密码
                    </li>
                    <li onClick={() => member.setItemMenu('mobile', ()=> history.push('/mobile'))} className={[
                        member.current === 'mobile'?'active': '',
                        'mobile'
                    ].join(' ')}>
                        <span>换绑手机</span>
                    </li>
                    <li>
                        参与话题
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Index);