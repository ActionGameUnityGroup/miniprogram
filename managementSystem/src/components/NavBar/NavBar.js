import React, {Component} from 'react';
import style from './NavBar.css';
import {Icon} from 'antd';

class NavBar extends Component{

  handleClick(e){
    document.querySelectorAll(`.${style['nav-item']}`).forEach(item => {
      item.className = style['nav-item'];
      // item.className = `${style['nav-item']}`;
    });
    e.target.className = `${style['nav-item']} ${style['nav-active']}`;
  }

  render(){
    return (
      <aside className={style['aside-content']} style={{height: this.props.height+'px', overflow: 'auto'}}>
        <div className={style['nav-list']}>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="home" />首页</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="search" />元素</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="home" />课堂</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="search" />模块</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="home" />分享</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="search" />主页管理</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="home" />商城</div>
          <div className={style['nav-item']} onClick={(e) => this.handleClick(e)}><Icon type="search" />设置</div>
        </div>
      </aside>
    );
  }
}

export default NavBar;