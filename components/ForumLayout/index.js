import React from 'react';
import ForumHead from '../ForumHead';
import Footer from '../widgets/Footer';
import './index.module.css';

export default class ForumLayout extends React.PureComponent{
    render() {
        return (
            <div>
                <ForumHead/>
               <div className="container-sm" style={{marginTop: 20, marginBottom: 50}}>
                   {this.props.children}
               </div>
                <Footer/>
            </div>
        )
    }
}