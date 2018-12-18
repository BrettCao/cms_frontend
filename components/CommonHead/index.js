import React from 'react';

import './index.module.css';
import {Input, Icon, Select} from 'antd';
import Tool from '../widgets/Tool';
import Link from 'next/link';
import {aRequest} from "../request";
import {auth} from '../Auth';
import Router from 'next/router';

const Search = Input.Search;

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

class CommonHead extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		defaultValue: '',
	}
	handleSearch(value) {
		Router.push({pathname: '/Search', query: {value}});
	}

	async componentDidMount() {
		const value = GetQueryString('value');
		this.setState({
			defaultValue: value
		})
        const data = await aRequest('get', '/is_login');
        if(!!!data) {
            auth.setLogin();
        }
    }

	render() {
		return (
			<section className="common-header">
				<div className="img-wrapper">
					<Link href="/index"><img src="/static/image/logo.png"/></Link>
				</div>
				<div className="search-wrapper">
					<Search placeholder="输入关键字查找" value={this.state.defaultValue} onChange={value => this.setState({defaultValue: value.target.value})} enterButton="搜索" onSearch={value => this.handleSearch(value)}/>
				</div>
				<div className="menu-wrapper">
					<Tool className="menu-wrapper"/>
				</div>
			</section>
		);
	}
}
export default CommonHead;