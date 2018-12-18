import React, {Component} from 'react';

import './index.module.css';
import PaperCorrelation from '../../components/PaperCorrelation/Index'
import CommonHead  from '../../components/CommonHead';
import Document from 'next/document';
import {aRequest} from '../../components/request';
import {SEOHeader} from '../../components/SEOHeader';

class Index extends Document {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    static async getInitialProps({query}) {
        const paper = await aRequest('get', '/paper_detail', {
            params: {
                id: query.id
            }
        });

        return { paper };
    }
    render() {
        function createMarkup(html) {
          return {__html: html};
        }
        const {paper} = this.props;
        return (
            <div>
                <SEOHeader title={paper.title} keywords={paper.key_words}/>
                <CommonHead/>
                <div className="container-sm">
                    <h1 style={{paddingTop: 30, fontWeight: 600}}>
                        {paper.title}
                    </h1>
                    <div className="paper-show-header">
                        {paper.author?<span>作者: {paper.author}</span>:null}
                        <span>日期: {paper.created_at}</span>
                        <span>浏览: {paper.eye}</span>
                    </div>
                    <div className="paper-show-body">
                        {paper.description?<article className="paper-show-body-summary">
                            <strong>摘要: </strong>
                            <span dangerouslySetInnerHTML={createMarkup(paper.description)}></span>
                        </article>:null}
                        {paper.keys_words?<article className="paper-show-body-keywords">
                            <strong>关键词: </strong>
                            <span dangerouslySetInnerHTML={createMarkup(paper.key_words)}></span>
                        </article>:null}
                        {paper.content?<article className="paper-show-body-content">
                            <div dangerouslySetInnerHTML={createMarkup(paper.content)}></div>
                        </article>:null}
                    </div>
                    {paper.list.length>0?<PaperCorrelation list={paper.list}/>:null}
                </div>
            </div>
        )
    }
}

export default Index;