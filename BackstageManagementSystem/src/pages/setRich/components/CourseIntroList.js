import React, { Component } from 'react';
import { Upload, Icon, Button } from 'antd';
import { request, URL } from '@/utils';


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

    const value = props.value.value;
    this.state = {
      value,
      loading: false,
    }
  }

  beforeUpload = (file, fileList) => {
    console.log(fileList);
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
    const options = {
            method: 'POST',
            body: form
          };
    const _this = this;
    request(URL.uploadImage, options)
    .then(data => {
      if (data.data.code === 200) {
        let url = data.data.data.url;
        let imageList = _this.state.value;
        imageList.push(url);
        _this.setState({
          loading: false,
          value: imageList,
        });
        _this.triggerChange({ value: imageList });
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

  removeCourse = () => {
    console.log('删除课程');
    this.setState({ value: [] });
    this.triggerChange({ value: [] });
  }

  render() {
    const { loading, value } = this.state;

    const options = {
      beforeUpload: this.beforeUpload,
      customRequest: this.handleUpload,
      listType: 'picture-card',
      showUploadList: false,
    };

    return (
      <div>
        {
          value.length > 0 ?
          <div style={{ width: 300 }}>
            {
              value.map((url, key) => (
                <div key={key} style={{ width: '100%' }}>
                  <img src={url} alt="课程" style={{ display: 'block', width: '100%' }} />
                </div>
              ))
            }
            <div style={{ textAlign: 'right' }}>
              <Button type='primary' onClick={this.removeCourse}>删除课程</Button>
            </div>
          </div>
          : null
        }
        <Upload {...options}>
          {
            loading ?
            <Icon type='loading' style={{ fontSize: 18 }} />
            : <span>添加图片</span>
          }
        </Upload>
      </div>
    );
  }
}