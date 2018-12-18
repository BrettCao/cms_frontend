import React, {Component} from 'react';

import './index.module.css';
import {observable, action} from 'mobx'
import { observer } from 'mobx-react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
const correlationHoc = WrappedComponent => {
	class articleStore {
		@observable articles = null;
		constructor() {

		}

		@action
		async inid(title) {
			let list = [];
			try{
				list = await this.db(title);
			} catch (e) {
				list = [];
				throw new Error(e);
			}
			this.articles = list;
		}

		db() {
			return new Promise((resolve, reject) => {
				axios.get('./json/category.json').then(response=> {
					return response.data.message;
				}).then( data => {
					resolve(data);
				}).catch( e=> {
					reject(e);
				})
			});
		}
	}
	const store = new articleStore();
	return @observer class Index extends Component{
		constructor(props) {
			super(props);
			console.log('hoc', this.props);
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
	<section className="articles">
		{list.map((item, i) =>(
			<article onClick={()=>{history.push(`/paper/${item.id}`)}} key={i}>
				{item.title}
			</article>
		))}
	</section>
)


@correlationHoc
class Index extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}

	render() {
		const {history} = this.props;
		return (
			<div className="container-sm paper-correlation">
				<h3>相关论文</h3>
				<ArticleCorrelation history={history} list={this.props.articles}/>
			</div>
		)
	}
}

export default withRouter(Index);