import { connect } from 'dva';
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import styles from './setVideo.css';
import { URL, request, message } from '@/utils';
import router from 'umi/router';

import VideoTitle from './components/VideoTitle';
import VideoSort from './components/VideoSort';
import UploadImage from './components/UploadImage';
import VideoUrl from './components/VideoUrl';

const FormItem = Form.Item;

class SetVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoId: '',
      title: '',
      poster: '',
      video: '',
      sort: 0,
      time: 0
    };

    if (props.location.state) {
      let { videoId } = props.location.state;
      this.getVideoInfo(videoId);
    }
  }

  getVideoInfo = (videoId) => {
    const _this = this;
    request(`${URL.getVideoInfo}?videoId=${videoId}`, { method: 'GET' })
    .then(data => {
      let videoInfo = data.data.data[0];
      let { title, poster, url, sort, time } = videoInfo;
      _this.setState({
        videoId,
        title, poster,
        video: url, sort, time
      });
    }).catch(err => {
      console.error(err);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { title, poster, video, sort } = values;
        let body = {
          title: title.value,
          poster: poster.value,
          url: video.value,
          sort: sort.value,
          time: new Date().getTime()
        };
        let { videoId } = _this.state;
        let url = '';
        if (videoId) {
          url = URL.updateVideoInfo;
          body['videoId'] = videoId;
        } else {
          url = URL.setVideoInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/video');
            });
          } else {
            message.error(data.data.errMsg);
          }
        }).catch(err => {
          console.log(err);
          message.error(err);
        });
      }
    });
  }

  checkTitle = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入标题!');
  }

  checkPoster = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传封面!');
  }

  checkVideo = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传视频!');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>课程信息</h2>
        <div className={styles['form']}>
          <Form onSubmit={this.handleSubmit} labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} colon={false}>
            <FormItem label='标题'>{
              getFieldDecorator('title', {
                initialValue: { value: this.state.title },
                rules: [{
                  required: true
                },{
                  validator: this.checkTitle
                }]
              })(<VideoTitle />)
            }</FormItem>
            <FormItem label='封面'>{
              getFieldDecorator('poster', {
                initialValue: { value: this.state.poster },
                rules: [{
                  required: true
                },{
                  validator: this.checkPoster
                }]
              })(
                <UploadImage />
              )
            }</FormItem>
            <FormItem label='视频'>{
              getFieldDecorator('video', {
                initialValue: { value: this.state.video },
                rules: [{
                  required: true
                },{
                  validator: this.checkVideo
                }]
              })(
                <VideoUrl />
              )
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort }
              })(
                <VideoSort />
              )
            }</FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 3 }}>
              <Button type='primary' htmlType='submit'>提交</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const SetVideoForm = Form.create({ subTitle: 'SetVideo' })(SetVideo);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetVideoForm);
