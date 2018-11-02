import React from 'react';
import {connect} from 'dva';
import ModuleSection from './Module/ModuleSection';

const ModulePage = () => {
  return (
    <ModuleSection/>
  );
};

export default connect()(ModulePage);