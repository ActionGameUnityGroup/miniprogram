import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { request, URL } from '@/utils';

class UploadImage extends Component {
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

    const value = props.value.value;
    console.log(value);
    this.state = {
      value: '',
      loading: false,
    }
  }

  beforeUpload = (file) => {
    const { type } = file;
    console.log(type);
    if (type === 'video/mp4') {
      this.setState({ loading: true });
      return true;
    } else {
      return false;
    }
  }

  handleUpload = (e) => {
    const form = new FormData();
    form.append('video', e.file);
    const options = {
            method: 'POST',
            body: form
          };
    const _this = this;
    request(URL.uploadVideo, options)
    .then(data => {
      if (data.data.code === 200) {
        let value = data.data.data.url;
        console.log(value);
        _this.setState({
          loading: false,
          value,
        });
        _this.triggerChange({ value });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, { value: this.state.value }, changedValue));
    }
  }

  render() {
    const options = {
      beforeUpload: this.beforeUpload,
      customRequest: this.handleUpload,
      listType: 'picture-card',
      showUploadList: false,
    };

    const { loading, value } = this.state;

    return (
      <Upload {...options}>
        {
          loading ?
          <Icon type="loading" style={{ fontSize: 18 }} />
          : value ?
          <video src={value} alt="视频" style={{ width: 300 }} controls />
          : <span>选择视频</span>
        }
      </Upload>
    );
  }
}

export default UploadImage;