/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';
// var Spinner = require('react-spinkit');

import styles from  './dom-loading.module.css';

const DomLoading = () => (
    <div className={styles.domLoadingWrapper}>
        <div className="domLoadingView">
            加载中...
        </div>
    </div>
);
export default DomLoading;