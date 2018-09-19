import React, {Component} from 'react';
import {Icon, Button, Input} from 'antd';
import style from './Login.css';
import crypto from 'crypto';
import request from '../../utils/request';
// const TextArea = Input.TextArea;

class LoginSection extends Component{

  state = {
    username: '',
    password: ''
  }

  handleTypingUserName(e){
    const md5 = crypto.createHash('md5'); 
    md5.update(e.target.value); // 加入到md5算法队列
    let encodeUserName = md5.digest('hex');
    this.setState({
      username: encodeUserName
    });
  }

  handleTypingPassWord(e){
    const md5 = crypto.createHash('md5');
    md5.update(e.target.value); // 加入到md5算法队列
    let encodePassWord = md5.digest('hex');
    this.setState({
      password: encodePassWord
    });
  }

  handleLogin(){
    let [username, password] = [this.state.username, this.state.password];
    // const sha1 = crypto.createHash('sha1'); // sha1算法
    // sha1.update(this.state.username+this.state.password);
    // let encodeToken = sha1.digest('hex');
    // console.log(encodeToken);
    /*request(
      'http://localhost:9000/manage/login',
      {
        method: 'POST',
        body: JSON.stringify({username: 'f81ea43e20e1d6a0ee0385e3c5f6c8c0', password: 'cb5dab341f8202d2e310ec07a9dd542b'})
      }
    )
    .then(res => {
      console.info(res);
    })
    .catch(err => {
      console.error(err);
    });*/
    request('https://www.changdaolife.cn/manage/login?username=f81ea43e20e1d6a0ee0385e3c5f6c8c0&password=cb5dab341f8202d2e310ec07a9dd542b')
    .then(res => {
      console.info(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){
    return (
      <div className={style["page"]}>
        <div className={style['login-content']}>
          <h1 className={style["login-title"]}>
            <p>常道智慧生活</p>
            <p>后台管理系统</p>
          </h1>
          <Input placeholder='账号' prefix={<Icon type="user" theme="outlined" />} style={{marginTop: 15}} value='ivey' onChange={e => this.handleTypingUserName(e)} />
          <Input placeholder='密码' prefix={<Icon type="key" theme="outlined" />} style={{marginTop: 15}} value='changdao@ivey' onChange={e => this.handleTypingPassWord(e)} type='password' />
          <Button type='primary'  style={{marginTop: 15}} onClick={() => this.handleLogin()}>登录</Button>
        </div>
      </div>
    );
  }
}

export default LoginSection;