import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 朗企科技技术部
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title="朗企后台管理系统">
          <div className={styles.container}>
            <div className={styles.lang}>
              <SelectLang />
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <Link to="/">
                    <img alt="logo" className={styles.logo} src={logo} />
                    <span className={styles.title}>朗企后台管理系统</span>
                  </Link>
                </div>
                <div className={styles.desc}>9年沉淀，优雅的后台管理系统</div>
              </div>
              {children}
            </div>
            <GlobalFooter links={links} copyright={copyright} />
          </div>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default UserLayout;