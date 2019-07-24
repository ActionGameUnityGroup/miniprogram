import React, { Component } from 'react';

import { LocaleProvider, Layout, Menu, Avatar, Icon, Dropdown } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.css';
import router from 'umi/router';
// import { request, message, URL } from '@/utils';

const { Header, Sider, Content, /*Footer*/ } = Layout;
const { SubMenu } = Menu;

const routes = {
  '/tutor': {
    openKeys: ['staff'],
    selectedKeys: ['tutor'],
  },
  '/setTutor': {
    openKeys: ['staff'],
    selectedKeys: ['tutor'],
  },
  '/assistant': {
    openKeys: ['staff'],
    selectedKeys: ['assistant'],
  },
  '/setAssistant': {
    openKeys: ['staff'],
    selectedKeys: ['assistant'],
  },
  '/feature': {
    openKeys: ['course'],
    selectedKeys: ['feature'],
  },
  '/setFeature': {
    openKeys: ['course'],
    selectedKeys: ['feature'],
  },
  '/rich': {
    openKeys: ['course'],
    selectedKeys: ['rich'],
  },
  '/setRich': {
    openKeys: ['course'],
    selectedKeys: ['rich'],
  },
  '/video': {
    openKeys: ['media'],
    selectedKeys: ['video'],
  },
  '/setVideo': {
    openKeys: ['media'],
    selectedKeys: ['video'],
  },
  '/studentShare': {
    openKeys: ['share'],
    selectedKeys: ['studentShare'],
  },
  '/setStudentShare': {
    openKeys: ['share'],
    selectedKeys: ['studentShare'],
  },
  '/introduction': {
    openKeys: ['cooperate'],
    selectedKeys: ['introduction'],
  },
  '/business': {
    openKeys: ['cooperate'],
    selectedKeys: ['business'],
  }
};

class BasicLayout extends Component {

  constructor(props) {
    super(props);
    let { token } = sessionStorage;
    if (!token) {
      router.push('/login', null);
    }
    let { pathname } = props.location;
    this.state = routes[pathname] || {
      openKeys: [],
      selectedKeys: [],
    };
  }

  handleChangeOpenKeys = (openKeys) => {
    let keys = openKeys[openKeys.length - 1];
    this.setState({ openKeys: [keys] });
  }

  handleChangeSelectKeys = (e) => {
    let selectedKeys = [e.key];
    this.setState({ selectedKeys });
    router.push(`/${selectedKeys[0]}`);
  }

  logout = () => {
    sessionStorage.removeItem('token');
    this.setState({
      openKeys: [],
      selectedKeys: [],
    });
    router.push('/login');
    /*request(URL.logout, { method: 'POST' })
    .then(data => {
      console.log(data);
    }).then(err => {
      console.error(err);
    });*/
  }

  getHtml = () => {
    const { props } = this;
    let pathname = props.location.pathname;
    if (pathname === '/login') {
      return props.children;
    }
    let userInfo = JSON.parse(sessionStorage.userInfo) || {nickname: 'admin'};
    let dropMenu = (
      <Menu>
        <Menu.Item style={{ textAlign: 'center' }} onClick={this.logout}>退出</Menu.Item>
      </Menu>
    );
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout>
          <Header className={styles['header']}>
            <div className={styles['logo']} />
            <Dropdown overlay={dropMenu}>
              <div className={styles['info-bar']}>
                <Avatar size={24} icon="user" />
                <span>{userInfo.nickname}</span>
              </div>
            </Dropdown>
          </Header>
          <Layout>
            <Sider width={180} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={this.state.selectedKeys}
                style={{ height: '100%', borderRight: 0 }}
                onOpenChange={this.handleChangeOpenKeys}
                onClick={this.handleChangeSelectKeys}
              >
                <SubMenu
                  key="staff"
                  title={
                    <span>
                      <Icon type="user" />
                      人员设置
                    </span>
                  }
                >
                  <Menu.Item key="tutor">导师</Menu.Item>
                  <Menu.Item key="assistant">助教</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="course"
                  title={
                    <span>
                      <Icon type="table" />
                      课程设置
                    </span>
                  }
                >
                  <Menu.Item key="feature">课程风采</Menu.Item>
                  <Menu.Item key="rich">丰盛系列</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="media"
                  title={
                    <span>
                      <Icon type="eye" />
                      媒体设置
                    </span>
                  }
                >
                  <Menu.Item key="video">视频</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="share"
                  title={
                    <span>
                      <Icon type="share-alt" />
                      分享设置
                    </span>
                  }
                >
                  <Menu.Item key="studentShare">学员分享</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="cooperate"
                  title={
                    <span>
                      <Icon type="team" />
                      合作设置
                    </span>
                  }
                >
                  <Menu.Item key="introduction">公司介绍</Menu.Item>
                  <Menu.Item key="business">承接业务</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: 24, height: window.innerHeight - 64, overflow: 'hidden' }}>
              {/*<Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>*/}
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minWidth: 960,
                  minHeight: 280,
                  height: '100%',
                  overflow: 'auto'
                }}
              >
                {props.children}
              </Content>
              {/*<Footer>底部</Footer>*/}
            </Layout>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }

  render () {
    return this.getHtml();
  }
}

export default BasicLayout;
