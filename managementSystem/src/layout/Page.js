import React, {Component} from 'react';
import NavBar2 from '../components/NavBar2';
import PageSection from '../components/PageSection/PageSection';
import PageHead from '../components/PageHead/PageHead';

function getClientHeight(){
  return window.innerHeight;
}

function getClientWidth(){
  return window.innerWidth;
}

class Page extends Component{
  render(){
    return (
      <div className="page" style={{height: getClientHeight()+'px'}}>
        <PageHead/>
        <content style={{height: getClientHeight() - 50 +'px'}}>
          <NavBar2
            height={getClientHeight() - 50}
            selectKey={['1']}
            history={this.props.history}
          />
          <PageSection height={getClientHeight() - 50} width={getClientWidth() - 112}>
            {this.props.children}
          </PageSection>
        </content>
        <footer></footer>
      </div>
    );
  }
}

export default Page;
