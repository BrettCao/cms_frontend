import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default class HeadTab extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        current: '',
    };
    static defaultProps = {
        tabs: []
    };
    componentDidMount() {
        const {tabs, onClick} = this.props;
        if(tabs.length> 0) {
            this.setState({
                current: tabs[0]
            }, () => {
                if(onClick) {
                    onClick(tabs[0]);
                }
            })
        }
    }
    handleClick = (current)=> {
        const {onClick} = this.props;
        this.setState({
            current
        }, () => {
            if(onClick) {
                onClick(current);
            }
        })
    };
    render() {
        let {tabs} = this.props;
        return (
            <div className={styles.component}>
                {tabs.map((item,i) => (
                    <span
                        onClick={this.handleClick.bind(this, item)}
                        className={[
                            this.state.current.id === item.id?'active':''
                        ].join(' ')}
                        key={`tab-${i}`}>
                        {item.label}
                    </span>
                ))}
            </div>
        )
    }
}

HeadTab.propTypes = {
    tabs: PropTypes.array
}