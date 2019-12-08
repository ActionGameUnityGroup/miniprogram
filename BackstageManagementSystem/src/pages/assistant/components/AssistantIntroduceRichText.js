import React, { Component } from 'react';
import { Button, } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


export default class extends Component {

  constructor(props) {
    super(props);

    const { html } = props;
    this.state = {
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(html),
      html,
      disabled: true,
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.html !== nextState.html) {
      this.setState({
        editorState: BraftEditor.createEditorState(nextProps.html),
        html: nextProps.html
      });
    }
  }

  handleEditorChange = (editorState) => {
    let { disabled } = this.state;
    if (this.state.html === editorState.toHTML()) {
      disabled = true;
    } else {
      disabled = false;
    }
    this.setState({ editorState, disabled });
  }

  handleSaveHtml = () => {
    const { editorState } = this.state;
    const html = editorState.toHTML();
    this.props.onChange(html);
  }

  render() {
    const { editorState, disabled } = this.state;
    return (
      <div>
        <BraftEditor value={editorState} onChange={this.handleEditorChange} />
        <div style={{ textAlign: 'right' }}><Button type='primary' onClick={this.handleSaveHtml} disabled={disabled}>保存</Button></div>
      </div>
    );
  }
}
