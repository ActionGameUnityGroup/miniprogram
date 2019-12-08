import { connect } from 'dva';
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import styles from './setTutor.css';
import { URL, request, message } from '@/utils';
import router from 'umi/router';

import TutorName from './components/TutorName';
import UploadImage from './components/UploadImage';
import TutorType from './components/TutorType';
import TutorTitle from './components/TutorTitle';
import TutorIntro from './components/TutorIntro';
import TutorSort from './components/TutorSort';

const FormItem = Form.Item;

class SetTutor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorId: '',
      name: '',
      avatar: '',
      type: '',
      title: [],
      intro: '',
      sort: 0,
    };

    console.log(props);

    if (props.location.state) {
      let { tutorId } = props.location.state;
      this.getTutorInfo(tutorId);
    }
  }

  getTutorInfo = (tutorId) => {
    const _this = this;
    request(`${URL.getTutorInfo}?tutorId=${tutorId}`, { method: 'GET' })
    .then(data => {
      let tutorInfo = data.data.data[0];
      let { avatar, name, personalIdentification, sort, title, type } = tutorInfo;
      _this.setState({
        intro: personalIdentification,
        avatar, name, sort, title, type, tutorId
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
        let { avatar, intro, name, title, type, sort } = values;
        let body = {
          avatar: avatar.value,
          name: name.value,
          title: title.value,
          type: type.value,
          sort: sort.value,
          personalIdentification: intro.value,
        };
        let { tutorId } = _this.state;
        let url = '';
        if (tutorId) {
          url = URL.updateTutorInfo;
          body['tutorId'] = tutorId;
        } else {
          url = URL.setTutorInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/tutor');
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
    callback('请输入导师姓名!');
  }

  checkAvatar = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请上传导师头像!');
  }

  checkType = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请选择导师类型!');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>导师信息</h2>
        <div className={styles['form']}>
          <Form onSubmit={this.handleSubmit} labelCol={{ span: 3 }} wrapperCol={{ span: 12 }} colon={false}>
            <FormItem label='姓名'>{
              getFieldDecorator('name', {
                initialValue: { value: this.state.name },
                rules: [{
                  required: true, message: '请输入导师姓名'
                },{
                  validator: this.checkName
                }]
              })(<TutorName />)
            }</FormItem>
            <FormItem label='头像'>{
              getFieldDecorator('avatar', {
                initialValue: { value: this.state.avatar },
                rules: [{
                  required: true, message: '请选择导师头像'
                },{
                  validator: this.checkAvatar
                }]
              })(
                <UploadImage />
              )
            }</FormItem>
            <FormItem label='类型'>{
              getFieldDecorator('type', {
                initialValue: { value: this.state.type },
                rules: [{
                  required: true, message: '请选择导师类型'
                },{
                  validator: this.checkType
                }]
              })(
                <TutorType />
              )
            }</FormItem>
            <FormItem label='头衔'>{
              getFieldDecorator('title', {
                initialValue: { value: this.state.title },
              })(
                <TutorTitle />
              )
            }</FormItem>
            <FormItem label='简介'>{
              getFieldDecorator('intro', {
                initialValue: { value: this.state.intro },
              })(
                <TutorIntro />
              )
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort },
              })(
                <TutorSort />
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

const SetTutorForm = Form.create({ name: 'SetTutor' })(SetTutor);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetTutorForm);
