/**
 * Created by Smile on 2018/4/11.
 */
import React, {Component} from 'react';

import Tool from '../components/widgets/Tool';
import Header from '../components/widgets/Header';
import Periodical from '../components/main/Periodical';
import Monographs from '../components/main/Monographs';
import Media from '../components/main/Media';
import Print from '../components/main/Print';
import Footer from  '../components/widgets/Footer';
import CategoryPage from '../components/main/category/index';
import {SEOHeader} from '../components/SEOHeader';
import {Row} from 'antd';
import Document from 'next/document';
import {aRequest} from '../components/request';
import {auth} from "../components/Auth";

class Index extends Document {
    constructor(props) {
        super(props);
    }
    static async getInitialProps() {
        const {categories} = await aRequest('get', '/journal_type_list');
        return { tabs: categories };
    }

    async componentDidMount() {
        const data = await aRequest('get', '/is_login');
        if(!!!data) {
            auth.setLogin();
        }
    }
    render() {
        return (
            <div>
                <SEOHeader title=""/>
                <Tool/>
                <Header/>
                <Periodical tabs={this.props.tabs}/>
                <Monographs/>
                <Print/>
                <Media/>
                <div className="main-category">
                    <div className="container-sm" style={{padding: 20}}>
                        <Row style={{margin: '0 -5px'}} gutter={10}>
                            <CategoryPage type="1" zh="论文范文"/>
                            <CategoryPage type="2" zh="应用文"/>
                            <CategoryPage type="3" zh="资料下载"/>
                        </Row>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;