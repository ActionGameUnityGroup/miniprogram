import React, {Component} from 'react';
import { Drawer, Input, Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';

class AddLesson extends Component {

  constructor(props){
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    };
    console.log(this.state, '添加课时组件');
  }


  handleUpload(){
    const _this = this;
    console.log(_this);
    const { fileList } = _this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: 'https://www.changdaolife.cn/api/lesson/setLesson',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {

    const { uploading } = this.state;

    return (
      <div>
        <Drawer
          title="添加课时"
          placement="right"
          maskClosable={false}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
            textAlign: 'center'
          }}
          placement="right"
          width={300}
          onClose={this.props.onHandelCancel}
          visible={this.props.isVisible}
        >
          <div width={'100%'}>
            <div style={{marginTop: 30, width: '100%'}}><Input defaultValue='课时名' /></div>
            <div style={{marginTop: 30, width: '100%'}}><Input.TextArea defaultValue='课时内容' /></div>
            <Upload
              action='https://www.changdaolife.cn/api/lesson/setLesson'
              onRemove={
                (file) => {
                  this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                      fileList: newFileList,
                    };
                  });
                }
              }
              beforeUpload={
                (file) => {
                  console.log(this.state.fileList, '文件列表');
                  const newFileList = [...this.state.fileList, file];
                  console.log('新文件列表', newFileList);
                  this.setState({
                    fileList: newFileList,
                  });
                  console.log(this.state, '更新后');
                  return false;
                }
              }
              fileList={this.state.fileList}
            >
              <Button block={true} style={{marginTop: 30, width: 245}}><Icon type="upload" /> 上传课时音频 </Button>
            </Upload>
            <Button
              style={{marginTop: 30}}
              className="upload-demo-start"
              type="primary"
              onClick={() => this.handleUpload()}
              disabled={this.state.fileList.length === 0}
              loading={uploading}
              block={true}
            >
              {uploading ? '正在添加' : '确认添加' }
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default AddLesson;