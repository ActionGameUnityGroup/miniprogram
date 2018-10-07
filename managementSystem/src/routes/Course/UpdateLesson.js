import React, {Component} from 'react';
import { Drawer, Input, Icon, Button, message, Upload, Select } from 'antd';
import AddLesson from './AddLesson';
import request from '../../utils/request';
const Option = Select.Option;

const mapChild = (list) => {
  let courseCoverist = [];
  list.forEach((child, index) => {
    courseCoverist.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return courseCoverist;
};

class UpdateLesson extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    courseCoverist: JSON.parse(localStorage.getItem('courseCoverist')) || [],
    isAddLesson: false
  };

  addCourse(){
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

  addLesson(e){
    console.log('添加课时');
    this.setState({
      isAddLesson: true
    });
  }

  cancelAddLesson(e){
    console.log('不添加课时');
    this.setState({
      isAddLesson: false
    });
  }

  removeLesson(){
    console.log('移除课时');
    this.setState({
      isAddLesson: false
    });
  }

  render() {

    const { previewVisible, previewImage, courseCoverist, dataSource } = this.state;
    const lessonList = [];
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      }
    };

    return (
      <div>
        <Drawer
          title="更新课程"
          placement="right"
          maskClosable={false}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
            textAlign: 'center'
          }}
          placement="right"
          width={700}
          onClose={this.props.onCancelAddCourse}
          visible={this.props.isVisible}
        >
          {
            lessonList.forEach(item => {
              return (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%'}}>
                  <Input defaultValue='课时名' />
                  <Input.TextArea defaultValue='课时内容' />
                  <Upload name='file'>
                    <Button><Icon type="upload" /> 上传课时音频 </Button>
                  </Upload>
                </div>
              )
            })
          }
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Select
              style={{width: 175}}
              value="课时标题"
              onChange={(e) => this.inputCourseTitle(e)}
              showArrow={false}
              open={false}
            ></Select>
            <Select
              style={{width: 275}}
              value="课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容课时内容"
              onChange={(e) => this.inputCourseDetail(e)}
              showArrow={false}
              open={false}
            ></Select>
            <Select
              style={{width: 175}}
              value="课时语音"
              onChange={(e) => this.inputCourseTitle(e)}
              showArrow={false}
              open={false}
            ></Select>
          </div>
          <AddLesson isVisible={this.state.isAddLesson} onHandelCancel={() => this.cancelAddLesson()} />
          <Button style={{marginTop: 30, width: '100%'}} onClick={() => this.addLesson()}> 添加课时 </Button>
          <Button style={{marginTop: 30, width: '100%'}} onClick={() => this.removeLesson()} type='danger'> 移除课时 </Button>
        </Drawer>
      </div>
    );
  }
}

export default UpdateLesson;