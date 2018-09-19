import React, {Component} from 'react';
import styles from './PageHead.css';

class PageHead extends Component{

  state = {
    avatar: localStorage.getItem('avatar'),
    nickname: localStorage.getItem('nickname'),
    token: localStorage.getItem('token')
  };

  handleExitAction(){
    console.log('退出');
    localStorage.removeItem('avatar');
    localStorage.removeItem('nickname');
    localStorage.removeItem('token');
  }

  render(){
    return (
      <header>
        <div className={styles['header-left']}>智慧生活平台</div>
        <div className={styles['header-right']}>
          <div className={styles['user-info']}>
            <span><img src={this.state.avatar} alt="用户头像"/></span>
            <span> {this.state.nickname} </span>
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