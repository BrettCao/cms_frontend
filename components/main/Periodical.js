import React, {Component} from 'react';
import styles from './periodical.module.css';
import { Icon } from 'antd';
import PeriodicalList from './PeriodicalList';
import DomLoading from '../common/DomLoading';
import {aRequest} from '../../components/request';
import Link from 'next/link';
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
                    >{tab.en_title}</li>
                ))}
            </ul>
        </div>
    ): null
)

class Periodical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs,
            current: {},
            loading: false,
            lists: []
        }
    }
    componentDidMount() {
        console.log(this.props);
        const current = this.props.tabs[0] || '';
        this.loadPeriodical();
    }

    async loadPeriodical(type) {
        let list = [];

        try {
            this.setState({
                loading: true
            });
            list= await aRequest('get', '/journal_list', {
                params: {
                    type
                }
            });
        } catch (e) {
            list: [];
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
            <div className={[
                "container-sm",
                styles.mainPeriodical
            ].join(' ')}>
                <div>
                    <h1>学术期刊</h1>
                    <p>Learned Periodical</p>
                </div>
                <MainHeader tabs={this.state.tabs} current={this.state.current} clickEvent={this.clickEvent.bind(this)}/>
                {!this.state.loading?
                    <PeriodicalList List={this.state.lists}/>:<DomLoading/>}
                <Link href="/Periodical">
                    <div className={styles.btnMore}>
                        更多 <Icon type="right-square-o" />
                    </div>
                </Link>
            </div>
        )
    }
}

export default Periodical;