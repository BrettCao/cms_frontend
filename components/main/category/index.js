import React, {Component} from 'react';
import {Select, Icon, Col} from 'antd';
import {observable, action, runInAction, autorun, computed} from 'mobx'
import { observer } from 'mobx-react';
import axios from 'axios';
import {aRequest} from '../../request';
import styles from  './index.module.css';
import Link from 'next/link';

class Store {
    @observable list = null;
    @observable select = null

    @action
    async db(type) {
        const _this = this;
        const data = await aRequest('get', '/ajax_paper', {
            params: {
                type
            }
        });
        _this.select = data.length>0?data[0]: '';
        _this.list = data || [];
    }

    @action.bound
    print(select) {
        runInAction(this.db.call(this, select), () => {
            this.select = select;
        });
    }
}


const cateHoc = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                options: null
            }
        }
        loading() {

        }
        load = (type) => {
            return new Promise((resolve, reject) => {
                axios.get(`./json/category.json?type=${type}`).then( response => {
                    return response.data.message;
                }).then(data => {
                    resolve(data);
                }).catch( e=> {
                    reject(e);
                })
            })
        };
        async componentDidMount() {
            let data = [];
            try{
                data = await aRequest('get', '/ajax_paper_type', {
                    params: {
                        type: this.props.type
                    }
                });
            } catch (e) {
                throw new Error(e);
                data = [];
            }
            this.setState({options: data});
        }
        render() {
            if(this.state.options) {
                let props = Object.assign({options: this.state.options}, this.props);
                return <WrappedComponent  {...props}/>
            } else {
                return null;
            }
        }
    }
};
const  renderTitle = (list, target) => {
    let title = '';
    list.map(item => {
        if(item.id === target) {
            title = item.title;
        }
    })
    return title;
};
export const OptionList = ({list, type, handleChange, store}) =>{

    return <Select defaultValue={renderTitle(list, store.select)} style={{ width: 120 }} onChange={handleChange}>
        {list.map((item, i)=>(
            <Select.Option key={`${type}-${i}`} value={item.id}>{item.title}</Select.Option>
        ))}
    </Select>
};

export const PaperList = ({list}) => (
    <section className={styles.paperList}>
        {list.map((item,i) => (
            <Link key={`paper-${item.id}`} href={{pathname: `/Paper`, query: {id: item.id}}}>
                <article style={{cursor: 'pointer'}} >
                    {item.title}
                </article>
            </Link>
        ))}
    </section>
);
@cateHoc @observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.store = new Store();

    }

    componentDidMount() {
        const {options, type, zh} = this.props;
        if(options.length >0) {
            this.store.print(options[0].id);
        }

    }
    handleChange(item) {
        this.store.select = item;
        this.store.print(item);
    }
    render() {
        return (
            <Col className={[
                "gutter-row",
                styles.categoryItem
            ].join(' ')} span={8} >
                <div className="gutter-box">
                    <div className={styles.sHeader}>
                        <h1>{this.props.zh}</h1>
                        <Link href={{pathname: '/Various', query: {id: this.props.type}}}><Icon type="arrow-right" /></Link>
                    </div>
                    {this.store.select?<OptionList store={this.store} type={this.props.type} handleChange={this.handleChange.bind(this)} list={this.props.options}/>: null}
                    {this.store.list?<PaperList list={this.store.list}/>:null}
                </div>
            </Col>
        )
    }
}

export default Index;