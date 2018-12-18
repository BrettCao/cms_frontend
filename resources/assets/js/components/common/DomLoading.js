/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';
var Spinner = require('react-spinkit');

import './dom-loading.module.css';

const DomLoading = () => (
    <div className="dom-loading-wrapper">
        <div className="dom-loading-view">
            <Spinner name="circle" color="aqua"/>
        </div>
    </div>
);
export default DomLoading;