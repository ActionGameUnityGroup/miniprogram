import React, {Component} from 'react';
// import NavBar2 from '../components/NavBar2';
// import PageSection from '../components/PageSection/PageSection';
// import PageHead from '../components/PageHead/PageHead';
import { Layout, Avatar } from 'antd';
import style from './Page.css';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const pathList = {
  "/": ["home", "home"],
  "/element": ["module", "element"],
  "/class": ["module", "class"],
  "/health": ["module", "health"],
  "/vip": ["module", "vip"],
  "/welfare": ["module", "welfare"],
  "/signin": ["module", "signin"],
  "/user": ["user", "user"],
  "/course": ["course", "course"],
  "/shop": ["shop", "shop"],
  "/setting": ["setting", "setting"],
  "/default": ["", ""],
};

const { Header, Content, Sider } = Layout;

class Page extends Component{

  constructor(props){
    super(props);
    const path = pathList[this.props.history.location.pathname] || pathList["/default"];
    console.log(path)
    this.state = {
      openKey: path[0],
      selectedKey: path[1],
    }
  }

  changesPage(e){
    const { history } = this.props;
    const { to } = e.item.props;
    const path = pathList[to] || pathList["/default"];
    history.push(to, null);
    // console.log(path);
    this.setState({
      openKey: path[0],
      selectedKey: path[1],
    });
  }

  showSubMenu(e){
    const { key } = e;
    this.setState({
      openKey: key,
    });
  }

  render(){
    const { openKey, selectedKey } = this.state;
    return (
      <Layout style={{height: window.innerHeight}}>
        <Header className={style['page-header']}>
          <div className={style['header-left']}>智慧生活平台</div>
          <div className={style['header-right']}>
            <div className={style['user-info']}>
              <Avatar icon='user' src={this.state.avatar} size='small' />
              <span className={style['user-info-name']}> {this.state.nickname} </span>
            </div>
            <div className={style['log-out']} onClick={this.handleExitAction}>
              <span><img src="/src/assets/icon/manage_4.png" alt="图标"/></span>
              <span> 退出 </span>
            </div>
          </div>
        </Header>
        <Layout style={{height: "100%"}}>
          <Sider width={220}>
            <Menu
              openKeys={[openKey]}
              selectedKeys={[selectedKey]}
              mode="inline"
              theme="dark"
              style={{height: "100%"}}
              // inlineCollapsed={true}
            >
              <SubMenu
                key="home"
                title={<span><Icon type="home" />首页</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="home" to='/' onClick={(e) => this.changesPage(e)}>
                  <span>首页</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="module"
                title={<span><Icon type="appstore-o" />模块</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="element" to='/element' onClick={(e) => this.changesPage(e)}>
                  <span>元素</span>
                </Menu.Item>
                <Menu.Item key="class" to='/class' onClick={(e) => this.changesPage(e)}>
                  <span>课堂</span>
                </Menu.Item>
                <Menu.Item key="health" to='/health' onClick={(e) => this.changesPage(e)}>
                  <span>疗愈</span>
                </Menu.Item>
                <Menu.Item key="vip" to='/vip' onClick={(e) => this.changesPage(e)}>
                  <span>会员</span>
                </Menu.Item>
                <Menu.Item key="welfare" to='/welfare' onClick={(e) => this.changesPage(e)}>
                  <span>公益</span>
                </Menu.Item>
                <Menu.Item key="signin" to='/signin' onClick={(e) => this.changesPage(e)}>
                  <span>签到</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="user"
                title={<span><Icon type="user" />用户列表</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="user" to='/user' onClick={(e) => this.changesPage(e)}>
                  <span>用户列表</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="course"
                title={<span><Icon type="schedule" />课程</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="course" to='/course' onClick={(e) => this.changesPage(e)}>
                  <span>课程</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="shop"
                title={<span><Icon type="shop" />积分商城</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="shop" to='/shop' onClick={(e) => this.changesPage(e)}>
                  <span>积分商城</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="setting"
                title={<span><Icon type="setting" />设置</span>}
                onTitleClick={(e) => this.showSubMenu(e)}
              >
                <Menu.Item key="setting" to='/setting' onClick={(e) => this.changesPage(e)}>
                  <span>设置</span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content className={style['page-section']}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Page;
