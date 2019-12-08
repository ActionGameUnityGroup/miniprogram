import { connect } from 'dva';
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import styles from './SetFeature.css';
import { URL, request, message } from '@/utils';
import router from 'umi/router';

import FeatureTitle from './components/FeatureTitle';
import FeatureSubTitle from './components/FeatureSubTitle';
import FeatureSort from './components/FeatureSort';
import UploadImage from './components/UploadImage';
import FeatureContent from './components/FeatureContent';

const FormItem = Form.Item;

class SetFeature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featureId: '',
      title: '',
      subTitle: '',
      cover: '',
      content: '',
      sort: 0,
      isRelease: false,
      releaseTime: 0,
      viewCount: 0,
    };

    if (props.location.state) {
      let { featureId } = props.location.state;
      console.log(featureId);
      this.getFeatureInfo(featureId);
    }
  }

  getFeatureInfo = (featureId) => {
    const _this = this;
    request(`${URL.getCourseFeatureInfo}?featureId=${featureId}`, { method: 'GET' })
    .then(data => {
      let featureInfo = data.data.data[0];
      console.log(featureInfo);
      let { title, subTitle, cover, isRelease, releaseTime, sort, content, viewCount } = featureInfo;
      _this.setState({
        featureId,
        title, subTitle, cover, sort, content,
        isRelease, releaseTime, viewCount,
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
        let { content, cover, sort, subTitle, title } = values;
        let body = {
          title: title.value,
          subTitle: subTitle.value,
          content: content.value,
          cover: cover.value,
          sort: sort.value,
          isRelease: _this.state.isRelease,
          releaseTime: _this.state.releaseTime,
          viewCount: _this.state.viewCount,
        };
        let { featureId } = _this.state;
        let url = '';
        if (featureId) {
          url = URL.updateCoursefeatureInfo;
          body['featureId'] = featureId;
        } else {
          url = URL.setCourseFeatureInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/feature');
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

  checkCover = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传封面!');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>课程风采信息</h2>
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
              })(<FeatureTitle />)
            }</FormItem>
            <FormItem label='副标题'>{
              getFieldDecorator('subTitle', {
                initialValue: { value: this.state.subTitle },
              })(<FeatureSubTitle />)
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort },
              })(
                <FeatureSort />
              )
            }</FormItem>
            <FormItem label='封面'>{
              getFieldDecorator('cover', {
                initialValue: { value: this.state.cover },
                rules: [{
                  required: true
                },{
                  validator: this.checkCover
                }]
              })(
                <UploadImage />
              )
            }</FormItem>
            <FormItem label='内容'>{
              getFieldDecorator('content', {
                initialValue: { value: this.state.content },
              })(
                <FeatureContent />
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

const SetFeatureForm = Form.create({ subTitle: 'SetFeature' })(SetFeature);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetFeatureForm);
