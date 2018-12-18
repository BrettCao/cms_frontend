import React, {Component} from 'react';
import './periodical.module.css';
import { Icon } from 'antd';
import PeriodicalList from './PeriodicalList';
import DomLoading from '../common/DomLoading';
import {withRouter} from 'react-router-dom';

import axios from 'axios';

const tabs1 = [{
    id: '1',
    title: '经济',
}, {
    id: '2',
    title: '教育',
}, {
    id: '3',
    title: '医学',
}, {
    id: '4',
    title: '科技',
}, {
    id: '5',
    title: '政治',
}, {
    id: '6',
    title: '历史',
}, {
    id: '7',
    title: '文学'
}, {
    id: '8',
    title: '艺术'
}, {
    id: '9',
    title: '工业'
}, {
    id: '11',
    title: '农业'
}];

export const MainHeader = ( { tabs, current, clickEvent } ) => (
    tabs?(
        <div className="header-tab">
            <ul>
                {tabs.map((tab, i) => (
                    <li className={[
                        current == tab?'active':''
                    ].join(' ')} key={i}
                        onClick={() => {
                            clickEvent(tab);
                        }}
                    >{tab.title}</li>
                ))}
            </ul>
        </div>
    ): null
)

class Periodical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: tabs1,
            current: {},
            loading: false,
            lists: []
        }
    }

    componentDidMount() {
        this.loadPeriodical('1');
    }
    parse() {
        return new Promise((resolve, reject) => {
            axios.get('./json/periodical.json').then( response => {
                return response.data.message;
            }).then( data => {
                resolve(data);
            }).catch( e=> {
                reject(e);
            });
        })
    }
    async loadPeriodical(type) {
        let list = [];

        try {
            this.setState({
                loading: true
            });
            list= await this.parse();
            console.log('wait');
        } catch (e) {
           lists: [];
            throw e;
        };
        this.setState({
            loading: false,
            lists: list
        })
    };
    clickEvent(current) {
        this.setState({current}, () => {
            this.loadPeriodical(current.id);
        });
    };
    render() {
        return (
            <div className="container-sm main-periodical">
                <div>
                    <h1>学术期刊</h1>
                    <p>Learned Periodical</p>
                </div>
                <MainHeader tabs={this.state.tabs} current={this.state.current} clickEvent={this.clickEvent.bind(this)}/>
                {!this.state.loading?
                    <PeriodicalList List={this.state.lists}/>:<DomLoading/>}
                <div onClick={()=>this.props.history.push('/periodical')} className="btn-more">
                    更多 <Icon type="right-square-o" />
                </div>
            </div>
        )
    }
}

export default withRouter(Periodical);