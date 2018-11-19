import React from 'react';
import { connect } from 'dva';
import IndexSection from './IndexSection';

function IndexPage() {
  return (
    <IndexSection/>
  );
}

export default connect()(IndexPage);
