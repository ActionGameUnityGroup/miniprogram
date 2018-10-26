import React from 'react';
import { connect } from 'dva';
import IndexSection from './Index/IndexSection';

function IndexPage() {
  return (
    <IndexSection/>
  );
}

export default connect()(IndexPage);
