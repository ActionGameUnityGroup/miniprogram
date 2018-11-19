import React from 'react';
import {connect} from 'dva';
import LoginSection from './Login';

function LoginPage({dispatch}){

  function login(avatar, nickname, token){
    dispatch({
      type: 'admin/login',
      payload: {
        avatar: avatar,
        nickname: nickname,
        token: token
      },
    });
  }

  return (
    <div className="page" style={{position: 'relative'}}>
      <LoginSection onLogin={login}/>
    </div>
  );
}

export default connect(({avatar, nickname, token}) => ({
  avatar, nickname, token
}))(LoginPage);
