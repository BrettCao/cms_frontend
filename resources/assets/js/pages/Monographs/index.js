import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';

import './index.module.css';
import MonographsList from '../../components/MonographsList/Index';
import axios from 'axios';
import CommonHead from '../../components/CommonHead';


class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <CommonHead/>
                    <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="desktop/image/p-img.png"/>
                    </div>
                    <MonographsList/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;