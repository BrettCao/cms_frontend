/**
 * Created by Smile on 2018/4/23.
 */
import React, {Component} from 'react';

import Footer from '../widgets/Footer';
import CommonHead from '../CommonHead';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <CommonHead/>
                <div className="container-sm">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Layout;