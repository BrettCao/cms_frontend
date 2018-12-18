import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '帮助中心',
          title: '帮助中心',
          href: 'moddns.com/c1/help',
          blankTarget: true,
        },
        {
          key: '朗企科技',
          title: '朗企科技',
          href: 'http://www.langqichina.com/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 朗企网络科技有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
