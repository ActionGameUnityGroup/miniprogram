import React, {Component} from 'react';
import {Avatar} from 'antd';
import styles from './PageHead.css';

class PageHead extends Component{
  constructor(props){
    super(props);
    this.state = {
      avatar: sessionStorage.getItem('avatar'),
      nickname: sessionStorage.getItem('nickname'),
      token: sessionStorage.getItem('token')
    };
  }

  handleExitAction(){
    console.log('退出');
    sessionStorage.removeItem('avatar');
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('token');
    this.setState({
      avatar: '',
      nickname: '',
      token: ''
    });
  }

  render(){
    return (
      <header>
        <div className={styles['header-left']}>智慧生活平台</div>
        <div className={styles['header-right']}>
          <div className={styles['user-info']}>
            <Avatar icon='user' src={this.state.avatar} size='small' />
            <span className={styles['user-info-name']}> {this.state.nickname} </span>
          </div>
          <div className={styles['log-out']} onClick={this.handleExitAction}>
            <span><img src="/src/assets/icon/manage_4.png" alt="图标"/></span>
            <span> 退出 </span>
          </div>
        </div>
      </header>
    );
  }
}

export default PageHead;