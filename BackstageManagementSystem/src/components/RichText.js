import React, { Component } from 'react';
import { URL } from '@/utils';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

// const uploadImageUrl = 'http://127.0.0.1:9000' + URL.uploadImage;
const uploadImageUrl = 'https://www.changdaolife.cn' + URL.uploadImage;

export default class extends Component {

  constructor(props) {
    super(props);
    let value = props.value || '';
    this.state = {
      editorState: BraftEditor.createEditorState(value),
      value: value,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
  }


  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  myUploadFn = (param) => {

    const serverURL = uploadImageUrl;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      let res = JSON.parse(xhr.response);
      param.success({
        url: res.data.url,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
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
    return (
      <BraftEditor value={editorState} onChange={this.handleEditorChange} media={{uploadFn: this.myUploadFn}} />
    );
  }
}
