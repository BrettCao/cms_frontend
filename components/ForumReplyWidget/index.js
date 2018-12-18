import React, {Fragment} from 'react';
import styles from './index.module.css';
import {EmptyModule} from "../EmptyModule";

import {aRequest} from "../request";
import Link from 'next/link';

class Index extends React.Component{
    componentDidMount() {
        this.init();
    }

    state = {
        list: []
    }
    async init () {
          try{
              const list = await aRequest('get', '/hot_topic');
              this.setState({
                  list
              })
          } catch (e) {
              throw new Error(e);
          }
    }

    render() {
        const {list} = this.state;
        return (
            <section className={styles.component}>
                <h3>
                    推荐话题
                </h3>
                {list && list.length > 0 ? <Fragment>
                    {list.map((item, i) => (
                        <Link href={{pathname: '/p', query: {id: item.id}}} key={`reply=-${i}`}><div className={styles.item} style={{padding: '5px 10px'}}> {item.title}</div></Link>
                    ))}
                </Fragment> : EmptyModule}
            </section>
        )
    }
}

export default Index;

