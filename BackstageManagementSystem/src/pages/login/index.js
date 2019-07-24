import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Button, Checkbox } from 'antd';
import router from 'umi/router';
import style from './login.css';
import crypto from 'crypto';
import { request, URL, message } from '@/utils';

class Login extends Component {

  constructor(props) {
    super(props);

    let username = localStorage.username || '';
    let checked = localStorage.checked || 'false';
    let password = '';

    if (!JSON.parse(checked)) {
      username = '';
    }

    this.state = {
      username: username,
      password: password,
      checked: JSON.parse(checked),
    };
  }

  saveLoginInfo(avatar, nickname, token) {
    localStorage.setItem('userInfo', JSON.stringify({ avatar, nickname }));
    if (!token) {
      message.warning('非法的登录凭证!');
      return;
    }
    sessionStorage.setItem('token', token);
  }

  handleTypingUserName = (e) => {
    this.setState({ username: e.target.value });
    if (this.state.checked) {
      localStorage.setItem('username', e.target.value);
    }
  }

  handleTypingPassWord = (e) => {
    this.setState({ password: e.target.value });
  }

  updateMD5(value) {
    const md5 = crypto.createHash('md5');
    md5.update(value); // 加入到md5算法队列
    let encodeValue = md5.digest('hex');
    return encodeValue;
  }

  handleLogin = () => {
    let [username, password] = [this.state.username, this.state.password];
    let _this = this;
    if(username.length && password.length) {
      let [encodeUsername, encodePassword] = [this.updateMD5(username), this.updateMD5(password)];
      request(URL.login,
        {
          method: 'POST',
          body: JSON.stringify({ username: encodeUsername, password: encodePassword }),
        }
      ).then(res => {
        if(res.data.status.includes('ok')) {
          const { avatar, nickname, info, token } = res.data.data;
          _this.saveLoginInfo(avatar, nickname, token);
          message.success(info, 2, () => {
            router.push('/', null);
          });
        } else {
          message.warning(res.data.errMsg);
        }
      }).catch(err => {
        console.error(err);
      });
    } else if(username.length && !password.length) {
      message.warning('请输入密码！');
    } else if(!username.length && password.length) {
      message.warning('请输入用户名！');
    } else{
      message.warning('请输入用户名和密码！');
    }
  }

  checkedUserName = (e) => {
    let checked = e.target.checked;
    this.setState({ checked });
    localStorage.setItem('checked', checked);
    if (checked) {
      localStorage.setItem('username', this.state.username);
    }
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <img src='https://www.changdaolife.cn/public/image/login-background.jpg' alt="background" style={{ width: '100%', height: window.innerHeight }} />
        <div className={style['login-content']}>
          <div className={style["login-title"]}>常道文化后台管理系统</div>
          <div className={style['login-sub-title']}>为800万人的生命觉醒点亮心灯而服务而工作</div>
          <div className={style['input-bar']}>
            <Icon type="user" theme="outlined" style={{ fontSize: 22, color: '#1155C4' }} />
            <input
              className={style['input']}
              placeholder='请输入管理员姓名'
              onChange={this.handleTypingUserName}
              value={this.state.username}
            />
          </div>
          <div className={style['input-bar']}>
            <Icon type="lock" theme="outlined" style={{ fontSize: 22, color: '#1155C4' }} />
            <input
              className={style['input']}
              placeholder='请输入登录密码'
              onChange={this.handleTypingPassWord}
              type='password'
              value={this.state.password}
            />
          </div>
          <div className={style['login-check-bar']}>
            <Checkbox onChange={this.checkedUserName} checked={this.state.checked}>
              <span style={{ marginLeft: 7, fontSize: 18, color: '#1155C4' }}>记住用户名</span>
            </Checkbox>
          </div>
          <Button type='primary' className={style['submit-btn']} onClick={this.handleLogin}>登录</Button>
        </div>
      </div>
    );
  }
}

/*const mapStateToProps = (state) => {
  return {
    avatar: state.admin.avatar,
    nickname: state.admin.nickname,
  };
}*/

export default connect()(Login);
