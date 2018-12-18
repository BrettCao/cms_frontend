import React, {Component} from 'react';

import {observable, action, runInAction} from 'mobx'
import {observer} from 'mobx-react';
import styles from './index.module.css';
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
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={[
                'container-sm',
                styles.periodicalFilter
            ].join(' ')}>
                <div className={styles.item}>
                    <strong>期刊分类 |</strong>
                    <span className={[
                        styles.none,
                        this.store.type === null?'active': ''
                    ].join(' ')} onClick={()=> {this.store.changeType(null);}}>不限</span>
                    {this.store.tArray.map((item, i)=>(
                        <span className={[
                            this.store.type&&this.store.type === item.id?'active': ''
                        ].join(' ')} onClick={()=>{this.store.changeType(item.id)}} key={`type-${i}`}>{item.en_title}</span>
                    ))}
                </div>
                <div className={styles.item}>
                    <strong>出版地区 |</strong>
                    <span className={[
                        styles.none,
                        this.store.area === null?'active': ''
                    ].join(' ')} onClick={()=> {this.store.area = null;}}>不限</span>
                    {this.store.aArray.map((item, i)=>(
                        <span className={[
                            this.store.area&&this.store.area === item.id?'active': ''
                        ].join(' ')} onClick={()=>{this.store.changeArea(item.id)}} key={`area-${i}`}>{item.full_name}</span>
                    ))}
                </div>
                <div className={styles.item}>
                    <strong>创刊时间 |</strong>
                    <span className={[
                        styles.none,
                        this.store.date === null?'active': ''
                    ].join(' ')} onClick={()=> {this.store.changeDate(null)}}>不限</span>
                    {this.store.dArray.map((item, i)=>(
                        <span className={[
                            this.store.date&&this.store.date === item.id?'active': ''
                        ].join(' ')} onClick={()=>{this.store.changeDate(item.id)}} key={`cycle-${i}`}>{item.title}</span>
                    ))}
                </div>
                <div className={styles.item}>
                    <strong className="">出版周期 |</strong>
                    <span className={[
                        styles.none,
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