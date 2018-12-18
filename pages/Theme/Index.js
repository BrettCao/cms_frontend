import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';


class Store {

}

const state = new Store();

@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>index</div>
        )
    }
}

export default Index;