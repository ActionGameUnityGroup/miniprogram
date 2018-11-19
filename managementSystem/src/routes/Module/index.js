import React from 'react';
import {connect} from 'dva';
import ModuleSection from './ModuleSection';

const ModulePage = () => {
  return (
    <ModuleSection/>
  );
};

export default connect()(ModulePage);