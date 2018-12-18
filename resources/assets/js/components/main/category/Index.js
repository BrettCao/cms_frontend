import React, {Component} from 'react';
import {Select, Icon} from 'antd';
import {observable, action, runInAction, autorun, computed} from 'mobx'
import { observer } from 'mobx-react';
import axios from 'axios';
import './index.module.css';

class Store {
    @observable list = null;
    @observable select = null

    @action
    async db(id) {
        const _this = this;
        axios.get(`./json/paper.json?id=${id}`).then(response=>{
          return response.data.message;
        }).then( data => {
            _this.select = data.length>0?data[0]: '';
            return _this.list = data;
        })
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
                data = await this.load(this.props.type);
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

export const OptionList = ({list, type, handleChange, store}) =>{
    return <Select defaultValue={store.select&&list[store.select]!= undefined?`${list[store.select].title}`:''} style={{ width: 120 }} onChange={handleChange}>
        {list.map((item, i)=>(
            <Select.Option key={`${type}-${i}`} value={item.id}>{item.title}</Select.Option>
        ))}
    </Select>
};

export const PaperList = ({list}) => (
    <section className="paper-list">
        {list.map((item,i) => (
            <article key={item.id}>
                {item.title}
            </article>
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
            <div className="col-md-4 category-item" style={{padding: '0 5px'}}>
                <div className="s-header">
                    <h1>{this.props.zh}</h1>
                    <Icon type="arrow-right" />
                </div>
                {this.store.select?<OptionList store={this.store} type={this.props.type} handleChange={this.handleChange.bind(this)} list={this.props.options}/>: null}
                {this.store.list?<PaperList list={this.store.list}/>:null}
            </div>
        )
    }
}

export default Index;