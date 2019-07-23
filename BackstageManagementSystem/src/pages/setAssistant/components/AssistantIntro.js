import React, { Component } from 'react';
import { Modal, Button } from 'antd';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

class AssistantIntroModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(props.value),
      content: props.value,
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.value !== nextState.content) {
      this.setState({
        editorState: BraftEditor.createEditorState(nextProps.value),
        content: nextProps.value
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
  }

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  }

  myUploadFn = (param) => {

    // const serverURL = 'http://127.0.0.1:9000/api/v0/upload/image';
    const serverURL = 'https://www.changdaolife.cn/api/v0/upload/image';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      let res = JSON.parse(xhr.response) || {};
      console.log(res);
      if (res.code === 200) {
        param.success({
          url: res.data.url,
          meta: {
            id: 'xxx',
            title: 'xxx',
            alt: 'xxx',
          }
        })
      }
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('image', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)

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
          media={{uploadFn: this.myUploadFn}}
        />
      </Modal>
    );
  }
}

export default class extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  handleShowContent = () => {
    this.setState({ visible: true });
  }

  handleAddContent = (content) => {
    this.triggerChange({ value: content });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, { value: this.state.content }, changedValue));
    }
  }

  handleHideContent = () => {
    this.setState({ visible: false });
  }

  render() {
    let { visible } = this.state;
    let content = this.props.value.value;
    return (
      <div>
      {
        content.length ?
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            border: '1px dashed #999',
            padding: 10,
            maxHeight: 220,
            borderRadius: 5,
            marginBottom: 10,
            overflow: 'auto'
          }}
        />
        : null
      }
      <Button onClick={this.handleShowContent}>{
        content.length ?
        '编辑内容' :
        '添加内容'
      }</Button>
      <AssistantIntroModal
        visible={visible}
        onChange={this.handleAddContent}
        onOk={this.handleHideContent}
        onCancel={this.handleHideContent}
        value={content}
      />
      </div>
    );
  }
}