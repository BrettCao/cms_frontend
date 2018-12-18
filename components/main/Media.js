/**
 * Created by Smile on 2018/4/11.
 */
import React, {Component} from 'react';
import { Icon } from 'antd';
import styles from  './monographs.module.css';
import DomLoading from '../common/DomLoading';
import MonographsList from './MonographsList';
import {aRequest} from '../../components/request';
import Link from 'next/link';

class Monographs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            lists: []
        }
    }
    parse() {
        return new Promise((resolve, reject) => {
            axios.get('./json/monographs.json').then( response => {
                return response.data.message;
            }).then( data => {
                resolve(data);
            }).catch( e=> {
                reject(e);
            });
        })
    }
    componentDidMount() {
        this.loadMonographs();
    }
    async loadMonographs() {
        let list = [];

        try {
            this.setState({
                loading: true
            });
            list= await aRequest('get', '/ajax_media', {
                params: {
                    type: 2
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
    render() {
        return (
            <div className={styles.mainMonographsWrapper}>
                <div className="container-sm">
                    <div className={styles.mainMonographs}>
                        <h1>线上媒体</h1>
                        <p>Online Media</p>
                    </div>
                    {!this.state.loading?<MonographsList List={this.state.lists}/>:<DomLoading/>}
                    <Link href="/Online"><div className={styles.btnMore}>
                        更多 <Icon type="right-square-o" />
                    </div></Link>
                </div>

            </div>
        )
    }
}

export default Monographs;
