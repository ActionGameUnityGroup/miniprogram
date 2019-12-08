import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Button } from 'antd';
import { request, message, URL } from '@/utils';
import styles from './setAssistant.css';

import AssistantName from './components/AssistantName';
import AssistantMotto from './components/AssistantMotto';
import UploadAvatar from './components/UploadAvatar';
import AssistantPhone from './components/AssistantPhone';
import AssistantWechat from './components/AssistantWechat';
import UploadQRCode from './components/UploadQRCode';
import AssistantSort from './components/AssistantSort';
import AssistantIntro from './components/AssistantIntro';

const FormItem = Form.Item;

class setAssistant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assistantId: '',
      name: '',
      title: '常道助教',
      avatar: '',
      phone: '',
      qrcode: '',
      wechat: '',
      sort: 0,
      intro: '',
    };

    if (props.location.state) {
      let { assistantId } = props.location.state;
      this.getAssistantInfo(assistantId);
    }
  }

  getAssistantInfo = (assistantId) => {
    request(`${URL.getAssistantInfo}?assistantId=${assistantId}`, { method: 'GET' })
    .then(data => {
      let assistantInfo = data.data.data[0];
      console.log();
      let { avatar, name, phone, qrcode, sort, title, wechat, intro, motto } = assistantInfo;
      this.setState({
        assistantId,
        avatar, name,
        phone, qrcode,
        sort, title,wechat,
        intro, motto
      });
      /*let { title, subTitle, cover, isRelease, releaseTime, sort, content, viewCount } = assistantInfo;
      _this.setState({
        assistantId,
        title, subTitle, cover, sort, content,
        isRelease, releaseTime, viewCount,
      });*/
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
        let { avatar, name, phone, qrcode, sort, wechat, intro, motto } = values;
        let body = {
          avatar: avatar.value,
          name: name.value,
          phone: phone.value,
          qrcode: qrcode.value,
          sort: sort.value,
          wechat: wechat.value,
          intro: intro.value,
          motto: motto.value
        };
        let { assistantId } = _this.state;
        let url = '';
        if (assistantId) {
          url = URL.updateAssistantInfo;
          body['assistantId'] = assistantId;
          message.info('正在更新', 9999);
        } else {
          url = URL.setAssistantInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/assistant');
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

  checkName = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入助教姓名!');
  }

  checkMotto = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入助教座右铭!');
  }

  checkAvatar = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传助教头像!');
  }

  checkQRCode = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传助教微信二维码!');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>助教信息</h2>
        <div className={styles['form']}>
          <Form onSubmit={this.handleSubmit} labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} colon={false}>
            <FormItem label='姓名'>{
              getFieldDecorator('name', {
                initialValue: { value: this.state.name },
                rules: [{
                  required: true
                },{
                  validator: this.checkName
                }]
              })(<AssistantName />)
            }</FormItem>
            <FormItem label='座右铭'>{
              getFieldDecorator('motto', {
                initialValue: { value: this.state.motto },
                rules: [{
                  required: true
                },{
                  validator: this.checkMotto
                }]
              })(<AssistantMotto />)
            }</FormItem>
            <FormItem label='头像'>{
              getFieldDecorator('avatar', {
                initialValue: { value: this.state.avatar },
                rules: [{
                  required: true
                },{
                  validator: this.checkAvatar
                }]
              })(
                <UploadAvatar />
              )
            }</FormItem>
            <FormItem label='手机号'>{
              getFieldDecorator('phone', {
                initialValue: { value: this.state.phone },
              })(<AssistantPhone />)
            }</FormItem>
            <FormItem label='微信号'>{
              getFieldDecorator('wechat', {
                initialValue: { value: this.state.wechat },
              })(<AssistantWechat />)
            }</FormItem>
            <FormItem label='微信二维码'>{
              getFieldDecorator('qrcode', {
                initialValue: { value: this.state.qrcode },
                rules: [{
                  required: true
                },{
                  validator: this.checkQRCode
                }]
              })(
                <UploadQRCode />
              )
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort },
              })(
                <AssistantSort />
              )
            }</FormItem>
            <FormItem label='简介'>{
              getFieldDecorator('intro', {
                initialValue: { value: this.state.intro },
              })(
                <AssistantIntro />
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

const SetAssistantForm = Form.create({ title: 'setAssistant' })(setAssistant);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetAssistantForm);
