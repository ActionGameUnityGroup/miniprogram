import React, {Component} from 'react';
import {Icon, Button, Input, message} from 'antd';
import style from './Login.css';
import crypto from 'crypto';
import request from '../../utils/request';
// const TextArea = Input.TextArea;

class LoginSection extends Component{

  /*state = {
    username: '',
    password: '',
  }*/

  constructor(props){
    super(props);
    console.log(this.props);
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
    if(username&&password){
      // console.log('有');
      request(
        'https://www.changdaolife.cn/manage/login',
        {
          method: 'POST',
          body: JSON.stringify({username: username, password: password}),
        }
      )
      .then(res => {
        console.info(res);
        // console.log(res.status === 200);
        if(res.data.status === 200){
          message.success(res.data.requestData.info);
          /*localStorage.setItem('avatar', res.data.requestData.avatar);
          localStorage.setItem('nickname', res.data.requestData.nickname);
          localStorage.setItem('token', res.data.requestData.token);*/
          this.props.onLogin(res.data.requestData.avatar, res.data.requestData.nickname, res.data.requestData.token);
          window.location.href = '/';
        } else {
          message.error(res.data.requestData.info);
        }
      })
      .catch(err => {
        console.error(err);
      });
    } else {
      console.log('无');
      // 
    }
  }

  render(){
    return (
      <div className={style["page"]}>
        <div className={style['login-content']}>
          <h1 className={style["login-title"]}>
            <p>常道智慧生活</p>
            <p>后台管理系统</p>
          </h1>
          <Input placeholder='账号' prefix={<Icon type="user" theme="outlined" />} style={{marginTop: 15}} onChange={e => this.handleTypingUserName(e)} />
          <Input placeholder='密码' prefix={<Icon type="key" theme="outlined" />} style={{marginTop: 15}} onChange={e => this.handleTypingPassWord(e)} type='password' />
          <Button type='primary'  style={{marginTop: 15}} onClick={() => this.handleLogin()}>登录</Button>
        </div>
      </div>
    );
  }
}

export default LoginSection;