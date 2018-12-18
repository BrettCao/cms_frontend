import React, {Component} from 'react';

import styles from  './index.module.css';
import {observable, action} from 'mobx'
import Link from 'next/link';
import {aRequest} from '../../components/request';

const correlationHoc = WrappedComponent => {
	class articleStore {
		@observable articles = null;
		constructor() {

		}

		@action
		async inid(title) {
			let list = [];
			try{
				list = await aRequest('get', '/');
			} catch (e) {
				list = [];
				throw new Error(e);
			}
			this.articles = list;
		}

	}
	const store = new articleStore();
	return @observer class Index extends Component{
		constructor(props) {
			super(props);
			store.inid(this.props.title);
		}
		render() {
			if(store.articles) {
				let props = Object.assign({articles: store.articles}, this.props);
				return <WrappedComponent {...props}/>
			} else {
				return <div style={{padding: 30, textAlign: 'center'}}>加载中...</div>
			}
		}
	}
}

export const ArticleCorrelation = ({list, history}) => (
	<section className={styles.articles}>
		{list.map((item, i) =>(
			<Link href={{pathname: '/Paper', query: {id: item.id}}} key={i}>
				<article>
				{item.title}
			</article>
			</Link>
		))}
	</section>
)


// @correlationHoc
class Index extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}

	render() {
		const {history} = this.props;
		return (
			<div className={[
				'container-sm',
				styles.paperCorrelation
			].join(' ')}>
				<h3>相关论文</h3>
				<ArticleCorrelation list={this.props.list}/>
			</div>
		)
	}
}

export default Index;