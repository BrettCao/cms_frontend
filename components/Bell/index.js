import React from 'react';
import {aRequest} from "../request";
import Link from 'next/link';
import {Badge, Icon} from 'antd';
class Index extends  React.Component {
    state ={
        count: 0
    };
    async componentDidMount() {
        try {
            const {total, list} = aRequest('get', '/ajax_notifiaction');
            this.setState({
                count: total
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    render() {
        const {count} = this.state;
        return(
            <Badge count={count} >
                <Link href="/Message"><Icon type="bell" style={{fontSize: 24}}/></Link>
            </Badge>
        )
    }
}
export default Index;