import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';
export const Ul = ({items, store}) => (
    <ul className="various-left-nav">
        {items.map((item, i) => (
            <li key={i} className={[
                store.li&&store.li.id == item.id?'active':''
            ].join(' ')} onClick={()=>{store.triggerLeft(item)}}>
                {item.title}
            </li>
        ))}
    </ul>
)

@observer
class VariousLeftNav extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id={this.store.li?this.store.li.id: ''}>
                {this.store.categorys?<Ul items={this.store.categorys} store={this.store}/>:null}
            </div>
        )
    }
}

export default VariousLeftNav;