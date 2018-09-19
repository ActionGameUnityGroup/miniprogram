import React from 'react';
import {connect} from 'dva';
import PageHead from '../components/PageHead/PageHead';
import NavBar2 from '../components/NavBar2';
import PageSection from '../components/PageSection/PageSection';

function getClientHeight(){
  return window.innerHeight;
}

function getClientWidth(){
  return window.innerWidth;
}

const ModulePage = () => {
  return (
    <div className="page" style={{height: getClientHeight()+'px'}}>
      <PageHead userName={'智慧小编'} avatar={''} />
      <content style={{height: getClientHeight() - 50 +'px'}}>
        <NavBar2 height={getClientHeight() - 50} selectKey={['5']} />
        <PageSection height={getClientHeight() - 50} width={getClientWidth() - 112}>积分商城</PageSection>
      </content>
      <footer></footer>
    </div>
  );
};

export default connect()(ModulePage);