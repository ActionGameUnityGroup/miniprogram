import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class NavBar2 extends Component {

  render() {
    return (
      <div style={{ height: this.props.height - 1, background: '#001529', borderTop: '1px solid #b4b4b4' }}>
        <Menu
          defaultSelectedKeys={this.props.selectKey}
          mode="vertical"
          theme="dark"
          // inlineCollapsed={true}
        >
          <Menu.Item key="1">
            <Link to='/'><Icon type="home" /><span>首页</span></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/module'><Icon type="appstore-o" /><span>模块</span></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/userList'><Icon type="user" /><span>用户列表</span></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/course'><Icon type="schedule" /><span>课程</span></Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/shop'><Icon type="shop" /><span>积分商城</span></Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to='/setting'><Icon type="setting" /><span>设置</span></Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBar2;