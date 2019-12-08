import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Button } from 'antd';
import styles from './introduction.css';
import { request, URL, message } from '@/utils';

import UploadImage from './components/UploadImage';
import IntroductionName from './components/IntroductionName';
import IntroductionAddress from './components/IntroductionAddress';
import IntroductionContent from './components/IntroductionContent';

const FormItem = Form.Item;

class Introduction extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      banner: '',
      name: '',
      address: '',
      intro: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.getIntroductionInfo();
  }

  getIntroductionInfo = () => {
    let _this = this;
    _this.setState({ loading: true });
    request(URL.getIntroductionInfo, {
      method: 'GET'
    }).then(data => {
      if (data.data.code === 200) {
        let { banner, name, address, intro } = data.data.data;
        _this.setState({
          banner, name,
          address, intro
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  checkName = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入公司名称!');
  }

  checkAddress = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入公司地址!');
  }

  checkIntro = (rule, value, callback) => {
    if (value.value) {
      callback();
      return;
    }
    callback('请输入公司简介!');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let { banner, name, address, intro } = values;
        let body = {
          banner: banner.value,
          name: name.value,
          address: address.value,
          intro: intro.value,
        };
        request(URL.updateIntroductionInfo, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info);
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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>公司介绍</h2>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          colon={false}
        >
          <FormItem label='Banner'>{
            getFieldDecorator('banner', {
              initialValue: { value: this.state.banner },
              rules: [{
                required: true
              },{
                validator: this.checkName
              }]
            })(<UploadImage />)
          }</FormItem>
          <FormItem label='名称'>{
            getFieldDecorator('name', {
              initialValue: { value: this.state.name },
              rules: [{
                required: true
              },{
                validator: this.checkName
              }]
            })(<IntroductionName />)
          }</FormItem>
          <FormItem label='地址'>{
            getFieldDecorator('address', {
              initialValue: { value: this.state.address },
              rules: [{
                required: true
              },{
                validator: this.checkAddress
              }]
            })(<IntroductionAddress />)
          }</FormItem>
          <FormItem label='简介'>{
            getFieldDecorator('intro', {
              initialValue: { value: this.state.intro },
              rules: [{
                required: true
              },{
                validator: this.checkIntro
              }]
            })(
              <IntroductionContent />
            )
          }</FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 3 }}>
            <Button type='primary' htmlType='submit'>保存</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

let IntroductionForm = Form.create({name: 'Introduction'})(Introduction);

export default connect()(IntroductionForm);