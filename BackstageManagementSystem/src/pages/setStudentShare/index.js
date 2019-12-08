import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Button } from 'antd';
import { request, message, URL } from '@/utils';
import styles from './setStudentShare.css';

import ShareName from './components/ShareName';
import ShareContent from './components/ShareContent';
import ShareSort from './components/ShareSort';

const FormItem = Form.Item;

class SetStudentShare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      name: '',
      avatar: '',
      time: new Date().getTime(),
      content: '',
      sort: 0,
    };

    if (props.location.state) {
      let { studentId } = props.location.state;
      this.getShareInfo(studentId);
    }
  }

  getShareInfo = (studentId) => {
    request(`${URL.getShareInfo}?studentId=${studentId}`, { method: 'GET' })
    .then(data => {
      let shareInfo = data.data.data[0];
      console.log();
      let { avatar, name, time, sort, content } = shareInfo;
      this.setState({
        studentId,
        avatar, name, time,
        sort, content
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
        let { name, content, sort } = values;
        let body = {
          avatar: '',
          name: name.value,
          content: content.value,
          sort: sort.value,
          time: _this.state.time,
        };
        let { studentId } = _this.state;
        let url = '';
        if (studentId) {
          url = URL.updateShareInfo;
          body['studentId'] = studentId;
          message.info('正在更新', 9999);
        } else {
          url = URL.setShareInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/studentShare');
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
    callback('请输入学员姓名!');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2>学员分享信息</h2>
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
              })(<ShareName />)
            }</FormItem>
            <FormItem label='内容'>{
              getFieldDecorator('content', {
                initialValue: { value: this.state.content },
              })(<ShareContent />)
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort },
              })(
                <ShareSort />
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

const SetStudentShareForm = Form.create({ title: 'SetStudentShare' })(SetStudentShare);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetStudentShareForm);
