import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import './index.module.css';

class Store {

}

const state = new Store();

// export const FilterType = ({list}) => (
//     <span>
//         {list.map((item, i) =>{
//             <span>{item.title}</span>
//         })}
//     </span>
// );

@observer
class PeriodicalFilter extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        console.log(this.props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container-sm periodical-filter">
                <div className="item">
                    <strong>创刊时间 |</strong>
                    <span className={[
                        "none",
                        this.store.date === null?'active': ''
                    ].join(' ')} onClick={()=> {this.store.changeDate(null)}}>不限</span>
                    {this.store.dArray.map((item, i)=>(
                        <span className={[
                            this.store.date&&this.store.date === item.id?'active': ''
                        ].join(' ')} onClick={()=>{this.store.changeDate(item.id)}} key={`cycle-${i}`}>{item.title}</span>
                    ))}
                </div>
                <div className="item">
                    <strong className="">出版周期 |</strong>
                    <span className={[
                        "none",
                        this.store.cycle === null?'active': ''
                    ].join(' ')} onClick={()=> {this.store.changeCycle(null)}}>不限</span>
                    {this.store.cArray.map((item, i) => (
                        <span className={[
                            this.store.cycle&&this.store.cycle === item.id?'active': ''
                        ].join(' ')} onClick={()=>{this.store.changeCycle(item.id)}} key={`cycle-${i}`}>{item.title}</span>
                    ))}
                </div>
            </div>
        )
    }
}

export default PeriodicalFilter;