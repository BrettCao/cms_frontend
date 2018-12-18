import React from 'react';

import './index.module.css';
import {Input, Icon, Select} from 'antd';
import Tool from '../widgets/Tool';
import {withRouter} from 'react-router-dom';

const selectBefore = (
  <Select defaultValue="download" style={{ width: 90 }}>
    <Select.Option value="peroide">学术期刊</Select.Option>
    <Select.Option value="monographs">专著出书</Select.Option>
    <Select.Option value="other">其他纸媒</Select.Option>
    <Select.Option value="online">线上媒体</Select.Option>
    <Select.Option value="paper">论文范文</Select.Option>
    <Select.Option value="apply">应用文</Select.Option>
    <Select.Option value="download">资料下载</Select.Option>
  </Select>
);

class CommonHead extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {history} = this.props;
		return (
			<section className="common-header">
				<div className="img-wrapper">
					<img onClick={() => history.push('/')} src="./desktop/image/logo.png"/>
				</div>
				<div className="search-wrapper">
					<Icon type="search" className="icon-search"/>
					<Input addonAfter={<span className="search">搜索</span>} addonBefore={selectBefore}/>
				</div>
				<div className="menu-wrapper">
					<Tool className="menu-wrapper"/>
				</div>
			</section>
		);
	}
}
export default withRouter(CommonHead);