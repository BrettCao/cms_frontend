import React, {Component} from 'react';
import Footer from '../../components/widgets/Footer';
import {observer} from 'mobx-react';
import '../Monographs/index.module.css';
import OnlineList from '../../components/OnlineList';
import CommonHead from '../../components/CommonHead';
import {SEOHeader} from "../../components/SEOHeader";

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
                <SEOHeader title="线上媒体"/>
                <CommonHead/>
                    <div className="periodical-wrapper-dom">
                    <div className="img-wrapper">
                        <img style={{width: '100%'}} src="/static/image/oline.png"/>
                    </div>
                    <OnlineList/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index;