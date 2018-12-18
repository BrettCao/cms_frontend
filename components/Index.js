/**
 * Created by Smile on 2018/4/11.
 */
import React, {Component} from 'react';

import Tool from './widgets/Tool';
import Header from './widgets/Header';
import Periodical from './main/Periodical';
import Monographs from './main/Monographs';
import Media from './main/Media';
import Print from './main/Print';
import Footer from  './widgets/Footer';
import CategoryPage from './main/category/Index';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tool/>
                <Header/>
                <Periodical/>
                <Monographs/>
                <Print/>
                <Media/>
                <div className="main-category">
                    <div className="container-sm row" style={{padding: 20}}>
                        <div className=" col-sm-12" style={{padding: 0}}>
                            <CategoryPage type="paper" zh="论文范文"/>
                            <CategoryPage type="apply" zh="应用文"/>
                            <CategoryPage type="download" zh="资料下载"/>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;