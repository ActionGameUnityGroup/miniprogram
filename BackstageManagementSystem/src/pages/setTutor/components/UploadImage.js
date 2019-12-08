import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { request } from '@/utils';

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
    this.state = {
      value,
      loading: false,
    }
  }

  beforeUpload = (file) => {
    const { type } = file;
    if (type === 'image/jpeg' || type === 'image/png') {
      this.setState({ loading: true });
      return true;
    } else {
      return false;
    }
  }

  handleUpload = (e) => {
    const form = new FormData();
    form.append('image', e.file);
    const url = '/api/v0/upload/image';
    const options = {
            method: 'POST',
            body: form
          };
    const _this = this;
    request(url, options)
    .then(data => {
      if (data.data.code === 200) {
        let value = data.data.data.url;
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
          <img src={value} alt="头像" style={{ width: 134 }} />
          : <span>选择头像</span>
        }
      </Upload>
    );
  }
}

export default UploadImage;