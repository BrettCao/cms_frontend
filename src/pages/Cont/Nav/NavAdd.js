import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Tabs } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { StickyContainer, Sticky } from 'react-sticky';
import NavBaseInfo from './NavBaseInfo';
import styles from './NavAdd.less';

const Pane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

export default class NavAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div>
        <h3>添加导航</h3>
        <StickyContainer>
          <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
            <Pane tab="基本信息" key="1">
              {<NavBaseInfo />}
            </Pane>
            <Pane tab="高级功能" key="2">
              {
                <div>
                  <BraftEditor
                    style={{
                      border: '1px solid #bababb',
                      borderRadius: 10,
                      background: '#fff',
                    }}
                  />
                </div>
              }
            </Pane>
          </Tabs>
        </StickyContainer>
        <div style={{ marginTop: 20 }}>
          <Button>保存</Button>
          <Button style={{ marginLeft: 20 }}>返回</Button>
        </div>
      </div>
    );
  }
}
