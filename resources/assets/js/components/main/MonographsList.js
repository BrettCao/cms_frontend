/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';

const MonographsList = ({List}) => (
    <div className="row">
        {List.map((item, i) => (
            <div className="col-md-2" key={i}>
                <img src={item} className="img-responsive"/>
            </div>
        ))}
    </div>
);
export default MonographsList;