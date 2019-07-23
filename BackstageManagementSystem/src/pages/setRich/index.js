import { connect } from 'dva';
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import styles from './SetRich.css';
import { URL, request, message } from '@/utils';
import router from 'umi/router';

import CourseTitle from './components/CourseTitle';
import CourseSubTitle from './components/CourseSubTitle';
import CourseCategory from './components/CourseCategory';
import CourseSort from './components/CourseSort';
import UploadImage from './components/UploadImage';
import CourseIntroList from './components/CourseIntroList';

const FormItem = Form.Item;

class SetRich extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      title: '',
      subTitle: '',
      cover: ''/*'https://www.changdaolife.cn/public/image/be9befee-32a7-4897-b201-56b1c6ee6326.jpg'*/,
      sort: 0,
      introList: [/*'https://www.changdaolife.cn/public/image/19fb1b18-be32-4057-a353-96e6a480e79b.jpg'*/],
      category: '',
      banner: '',
    };

    if (props.location.state) {
      let { courseId } = props.location.state;
      this.getCourseInfo(courseId);
    }
  }

  getCourseInfo = (courseId) => {
    const _this = this;
    request(`${URL.getCourseInfo}?courseId=${courseId}`, { method: 'GET' })
    .then(data => {
      let courseInfo = data.data.data[0];
      let { cover, category, title, subTitle, sort, introList } = courseInfo;
      _this.setState({
        courseId,
        cover, category,
        title, subTitle,
        sort, introList
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
        let { cover, title, subTitle, category, sort, introList } = values;
        let body = {
          banner: '',
          cover: cover.value,
          title: title.value,
          subTitle: subTitle.value,
          category: category.value,
          sort: sort.value,
          introList: introList.value,
        };
        let { courseId } = _this.state;
        let url = '';
        if (courseId) {
          url = URL.updateCourseInfo;
          body['courseId'] = courseId;
        } else {
          url = URL.setCourseInfo;
        }
        request(url, {
          method: 'POST',
          body: JSON.stringify(body),
        }).then(data => {
          if (data.data.code === 200) {
            message.success(data.data.data.info, 2, () => {
              router.push('/rich');
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
              })(<CourseTitle />)
            }</FormItem>
            <FormItem label='副标题'>{
              getFieldDecorator('subTitle', {
                initialValue: { value: this.state.subTitle },
              })(<CourseSubTitle />)
            }</FormItem>
            <FormItem label='类别'>{
              getFieldDecorator('category', {
                initialValue: { value: this.state.category },
              })(<CourseCategory />)
            }</FormItem>
            <FormItem label='排序'>{
              getFieldDecorator('sort', {
                initialValue: { value: this.state.sort },
              })(
                <CourseSort />
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
            <FormItem label='课程简介'>{
              getFieldDecorator('introList', {
                initialValue: { value: this.state.introList },
                rules: [{
                  required: true
                },{
                  validator: this.checkCover
                }]
              })(
                <CourseIntroList />
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

const SetRichForm = Form.create({ subTitle: 'SetRich' })(SetRich);

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(SetRichForm);
