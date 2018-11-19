import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class NavBar2 extends Component {

  changesPage(e){
    const { history } = this.props;
    const { to } = e.item.props;
    console.log(to);
    history.push(to, null);
  }

  render() {
    return (
      <div style={{ height: this.props.height - 1, background: '#001529', borderTop: '1px solid #b4b4b4' }}>
        <Menu
          defaultSelectedKeys={this.props.selectKey}
          mode="vertical"
          theme="dark"
          // inlineCollapsed={true}
        >
          <Menu.Item key="1" to='/' onClick={(e) => this.changesPage(e)}>
            <Icon type="home" /><span>首页</span>
          </Menu.Item>
          <Menu.Item key="2" to='/module' onClick={(e) => this.changesPage(e)}>
            <Icon type="appstore-o" /><span>模块</span>
          </Menu.Item>
          <Menu.Item key="3" to='/userList' onClick={(e) => this.changesPage(e)}>
            <Icon type="user" /><span>用户列表</span>
          </Menu.Item>
          <Menu.Item key="4" to='/course' onClick={(e) => this.changesPage(e)}>
            <Icon type="schedule" /><span>课程</span>
          </Menu.Item>
          <Menu.Item key="5" to='/shop' onClick={(e) => this.changesPage(e)}>
            <Icon type="shop" /><span>积分商城</span>
          </Menu.Item>
          <Menu.Item key="6" to='/setting' onClick={(e) => this.changesPage(e)}>
            <Icon type="setting" /><span>设置</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBar2;