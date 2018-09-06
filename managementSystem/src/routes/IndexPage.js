import React from 'react';
import { connect } from 'dva';
// import NavBar from '../components/NavBar/NavBar';
import NavBar2 from '../components/NavBar2';
import PageSection from '../components/PageSection/PageSection';
import PageHead from '../components/PageHead/PageHead';
import IndexSection from './Index/IndexSection';

function getClientHeight(){
  return window.innerHeight;
}

function getClientWidth(){
  return window.innerWidth;
}

function IndexPage() {
  return (
    <div className="page" style={{height: getClientHeight()+'px'}}>
      <PageHead userName={'智慧小编'} avatar={''} />
      <content style={{height: getClientHeight() - 50 +'px'}}>
        <NavBar2 height={getClientHeight() - 50} selectKey={['1']} />
        <PageSection height={getClientHeight() - 50} width={getClientWidth() - 112}>
          <IndexSection/>
        </PageSection>
      </content>
      <footer></footer>
    </div>
  );
}

export default connect()(IndexPage);
