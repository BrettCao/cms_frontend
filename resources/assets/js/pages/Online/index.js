import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import '../Monographs/index.module.css';
import OnlineList from '../../components/OnlineList/Index';
import axios from 'axios';
import CommonHead from '../../components/CommonHead';

class Store {
    
}


@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = new Store();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="">
                <CommonHead/>
                    <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img src="desktop/image/p-img.png"/>
                    </div>
                    <OnlineList/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;