import React from 'react';
import {connect} from 'dva';
import PageSection from '../components/PageSection/PageSection';

const ModulePage = () => {
  return (
    <div>用户列表</div>
  );
};

export default connect()(ModulePage);