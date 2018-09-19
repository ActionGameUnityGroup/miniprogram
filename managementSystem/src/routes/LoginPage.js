import React from 'react';
import {connect} from 'dva';
import LoginSection from './Login/Login';

function LoginPage(){
  return (
    <div className="page" style={{position: 'relative'}}>
      <LoginSection/>
    </div>
  );
}

export default connect()(LoginPage);