import React, {Component} from 'react';
import styles from  './periodical.module.css';
import { Icon } from 'antd';

import PeriodicalList from './PeriodicalList';
import DomLoading from '../common/DomLoading';
import {aRequest} from '../../components/request';
import Link from 'next/link';

const tabs1 = [{
    id: 4,
    title: '报纸',
}, {
    id: 3,
    title: '期刊',
}];

export const MainHeader = ( { tabs, current, clickEvent } ) => (
    tabs?(
        <div className={styles.headerTab}>
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
            current: tabs1[0],
            loading: false,
            lists: []
        }
    }

    componentDidMount() {
        this.loadPeriodical(tabs1[0]);
    }
    async loadPeriodical(type) {
        let list = [];

        try {
            this.setState({
                loading: true
            });
            list= await aRequest('get', '/ajax_media', {
                params: {
                    type: type.id
                }
            });
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
            this.loadPeriodical(current);
        });
    };
    render() {
        return (
            <div className={[
                "container-sm",
                styles.mainPeriodical
            ].join(' ')}>
                <div>
                    <h1>其他纸媒</h1>
                    <p>Other Print Media</p>
                </div>
                <MainHeader tabs={this.state.tabs} current={this.state.current} clickEvent={this.clickEvent.bind(this)}/>
                {!this.state.loading?
                    <PeriodicalList List={this.state.lists}/>:<DomLoading/>}
                <Link href={{pathname: "/OtherMedia", query: {type: this.state.current.id}}}>
                    <div className={styles.btnMore}>
                        更多 <Icon type="right-square-o" />
                    </div>
                </Link>
            </div>
        )
    }
}

export default Periodical;