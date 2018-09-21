import React, {Component} from 'react';
import { Drawer, Input, Select, DatePicker, Upload, Modal, Icon, Button, message } from 'antd';
import request from '../../utils/request';

const { Option } = Select;

const mapChild = (list) => {
  let courseCoverist = [];
  list.forEach((child, index) => {
    courseCoverist.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return courseCoverist;
};

class CreateCourse extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    courseCoverist: JSON.parse(localStorage.getItem('courseCoverist')) || [],
  };

  addCourse = () => {
    let _this = this;
    let [author, courseTitle, courseDetail] = [this.state.author, this.state.courseTitle, this.state.courseDetail];
    request(
      'https://www.changdaolife.cn/api/course/setCourse',
      {
        method: 'POST',
        body: JSON.stringify({author: author, courseTitle: courseTitle, courseDetail: courseDetail}),
      }
    )
    .then(res => {
      console.info(res);
      // console.log(res.status === 200);
      if(res.data.status === 200){
        message.success(res.data.requestData.info);
        this.props.onUpdate(res.data.requestData.courseList);
        this.props.onCancelAddCourse();
      } else {
        message.error(res.data.requestData.info);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  inputAuthorAction(e){
    // console.log(e);
    this.setState({
      author: e.target.value
    });
  }

  inputCourseTitle(e){
    // console.log(e);
    this.setState({
      courseTitle: e.target.value
    });
  }

  inputCourseDetail(e){
    // console.log(e);
    this.setState({
      courseDetail: e.target.value
    });
  }

  render() {
    const { previewVisible, previewImage, courseCoverist, dataSource } = this.state;
    return (
      <div>
        <Drawer
          title="添加课程"
          placement="right"
          maskClosable={false}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
          placement="right"
          width={600}
          onClose={this.props.onCancelAddCourse}
          visible={this.props.isVisible}
        >
          <div><Input style={{ width: 150 }} placeholder="课程讲师" onChange={(e) => this.inputAuthorAction(e)} /></div>
          <div><Input style={{marginTop: 30, width: 500}} placeholder="课程标题" onChange={(e) => this.inputCourseTitle(e)}/></div>
          <div><Input.TextArea rows={3} style={{marginTop: 30, width: 500}} placeholder="课程简介" onChange={(e) => this.inputCourseDetail(e)}/></div>
          <div style={{marginTop: 25}}>
            <p>课程封面</p>
            <Upload
              action="https://www.changdaolife.cn/api/course/setCourseCover"
              listType="picture-card"
              fileList={courseCoverist}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text"> 上传封面 </div>
              </div>
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <Button type='primary' style={{marginTop: 30, width: '100%'}} onClick={() => this.addCourse()}>确认添加</Button>
        </Drawer>
      </div>
    );
  }
}

export default CreateCourse;