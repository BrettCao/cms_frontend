/**
 * Created by Smile on 2018/4/11.
 */
import React, {Component} from 'react';
import { Icon } from 'antd';
import './monographs.module.css';
import DomLoading from '../common/DomLoading';
import MonographsList from './MonographsList';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
    render() {
        return (
            <div className=" main-monographs-wrapper">
                <div className="container-sm">
                    <div className="main-monographs">
                        <h1>线上媒体</h1>
                        <p>Online Media</p>
                    </div>
                    {!this.state.loading?<MonographsList List={this.state.lists}/>:<DomLoading/>}
                    <div onClick={() => this.props.history.push('/online')} className="btn-more">
                        更多 <Icon type="right-square-o" />
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Monographs);
