import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';

class RichText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1> 
                <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
      // markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
      // responseList: []
    }
    this.receiveHtml=this.receiveHtml.bind(this);
  }

  receiveHtml(content) {
    setTimeout(function() {
      console.log("recieved HTML content\n\n\n", content);
    }, 500);
    // this.setState({responseList:[]});
  }

  render(){
    let policy = "";
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: 'picture',
      // fileList: this.state.responseList,
      data: (file) => {},
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }
    return (
      <div style={{position: 'relative'}}>
        <h1>Editor demo 1 (use default html format ):</h1>
        <LzEditor
          style={{position: 'relative'}}
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          pasteNoStyle={false}
          video={false}
          audio={false}
          image={false}
          removeStyle={false}
          urls={false}
          fullScreen={false}
          pasteNoStyle={false}
          alignment={false}
          // uploadProps={uploadProps}
          lang="zh-CN"
        />
      </div>
    );
  }
}

export default RichText;