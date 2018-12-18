import React, {Component} from 'react';
import './periodical.module.css';
import { Icon } from 'antd';

import PeriodicalList from './PeriodicalList';
import DomLoading from '../common/DomLoading';

import axios from 'axios';

const tabs1 = [{
    id: 'paper',
    title: '报纸',
}, {
    id: 'journal',
    title: '期刊',
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
            axios.get('./json/print.json').then( response => {
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

        console.log('go');
        this.setState({
            loading: false,
            lists: list
        })
    };
    clickEvent(current) {
        console.log(current);
        this.setState({current}, () => {
            this.loadPeriodical(current.id);
        });
    };
    render() {
        return (
            <div className="container-sm main-periodical">
                <div>
                    <h1>其他纸媒</h1>
                    <p>Other Print Media</p>
                </div>
                <MainHeader tabs={this.state.tabs} current={this.state.current} clickEvent={this.clickEvent.bind(this)}/>
                {!this.state.loading?
                    <PeriodicalList List={this.state.lists}/>:<DomLoading/>}
                <div className="btn-more">
                    更多 <Icon type="right-square-o" />
                </div>
            </div>
        )
    }
}

export default Periodical;