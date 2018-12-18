import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {SEOHeader} from "../../components/SEOHeader";
import './index.module.css';
import MonographsList from '../../components/MonographsList';
import CommonHead from '../../components/CommonHead';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <SEOHeader title="专著出书"/>
                <CommonHead/>
                    <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img style={{width: '100%'}} src="/static/image/p-img.png"/>
                    </div>
                    <MonographsList/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;