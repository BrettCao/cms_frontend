/**
 * Created by Smile on 2018/5/22.
 */
import React from 'react';
import Head from 'next/head';
import  './index.module.css';
export const SEOHeader = ({title, keywords}) => (
    <Head>
        <title>{title?title: '论文发表讲诚信的专业职称发表论文网-发表吧'}</title>
        <meta name="description" content="论文发表-发表吧专业从事学术论文,职称论文发表和论文指导,与国内多家核心期刊,国家级期刊,省级期刊建立合作关系,提供教育,医学,科技,经济,CSSCI论文发表等服务的发表论文网." />
        <link rel="alternate" type="application/vnd.wap.xhtml+xml" media="handheld" href="http://m.fabiaoba.com/"/>

        <meta name="renderer" content="webkit"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="keywords" content={`${keywords?keywords:'论文发表,发表吧,教育论文,科技论文,免费论文,论文发表网,发表论文网'}`}/>
    </Head>
)