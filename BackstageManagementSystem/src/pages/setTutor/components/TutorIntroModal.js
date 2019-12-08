import React, { Component } from 'react';
import { Modal } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

class TutorIntroModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(props.value),
      intro: props.value,
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.value !== nextState.intro) {
      this.setState({
        editorState: BraftEditor.createEditorState(nextProps.value),
        intro: nextProps.value
      });
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  onOk = () => {
    const { onOk, onChange } = this.props;
    onOk();
    if (onChange) {
      onChange(this.state.editorState.toHTML());
    }
    /*this.setState({
      editorState: BraftEditor.createEditorState('')
    });*/
  }

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
    /*this.setState({
      editorState: BraftEditor.createEditorState('')
    });*/
  }

  render() {
    const { editorState } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        width={880}
        centered={true}
        style={{ paddingBottom: 0 }}
      >
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
        />
      </Modal>
    );
  }
}

export default TutorIntroModal;