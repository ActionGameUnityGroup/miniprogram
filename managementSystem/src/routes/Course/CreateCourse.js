import React, {Component} from 'react';
import { Drawer, Input, Select, DatePicker, Upload, Modal, Icon, AutoComplete } from 'antd';

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
    dataSource: [],
  };

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
      ],
    });
  }

  render() {
    const { previewVisible, previewImage, courseCoverist, dataSource } = this.state;
    return (
      <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          width={720}
          onClose={this.props.cancelAddCourseAction}
          visible={this.props.isVisible}
        >
          <AutoComplete
            dataSource={dataSource}
            style={{ width: 200 }}
            onSearch={this.handleSearch}
            placeholder="input here"
          />
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
        </Drawer>
      </div>
    );
  }
}

export default CreateCourse;

// const App = Form.create()(CreateCourse);