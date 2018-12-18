import React, {Component} from 'react';

import './index.module.css';
import PaperCorrelation from '../../components/PaperCorrelation/Index'
import CommonHead  from '../../components/CommonHead';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        function createMarkup(html) {
          return {__html: html};
        }
        return (
            <div>
                <CommonHead/>
                <div className="container-sm">
                    <h1 style={{paddingTop: 30, fontWeight: 600}}>
                        高速路面长江滨海
                    </h1>
                    <div className="paper-show-header">
                        <span>话没学,沿路还</span>
                        <span>浏览:123</span>
                    </div>
                    <div className="paper-show-body">
                        <article className="paper-show-body-summary">
                            <strong>摘要</strong>
                            <span dangerouslySetInnerHTML={createMarkup("text")}></span>
                        </article>
                        <article className="paper-show-body-keywords">
                            <strong>关键词</strong>
                            <span dangerouslySetInnerHTML={createMarkup("text")}></span>
                        </article>
                        <article className="paper-show-body-content">
                            <div dangerouslySetInnerHTML={createMarkup("text")}></div>
                        </article>
                    </div>
                    <PaperCorrelation title="test"/>
                </div>
            </div>
        )
    }
}

export default Index;