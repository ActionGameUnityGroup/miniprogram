import React, {Component} from 'react';
import { Upload, Modal, Icon } from 'antd';
import request from '../../../utils/request';
import style from './Signin.css';

const mapChild = function(list) {
  let signFileList = [];
  list.forEach((child, index) => {
    signFileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return signFileList;
};

class Signin extends Component{

  state = {
    previewVisible: false,
    previewImage: '',
    signFileList: JSON.parse(localStorage.getItem('signFileList')) || [],
  };

  UNSAFE_componentWillMount(){
    // console.log('插入前');
    let _this = this;
    request('https://www.changdaolife.cn/api/banner/getBanner?page=signin')
    .then(res => {
      console.info(res);
      let list = mapChild(res.data.requestData[0].bannerList);
      localStorage.setItem('signFileList', JSON.stringify(list));
      _this.setState({
        signFileList: list
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ signFileList }) => this.setState({ signFileList })
  render(){
    const { previewVisible, previewImage, signFileList } = this.state;
    return (
      <div>
        <h3 style={{marginTop: 20, marginLeft: 20}}>日签</h3>
        <div className={style["images-content"]}>
          <Upload
            action="https://www.changdaolife.cn/api/banner/setBanner?page=signin"
            listType="picture-card"
            fileList={signFileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text"> 上传图片 </div>
            </div>
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Signin;