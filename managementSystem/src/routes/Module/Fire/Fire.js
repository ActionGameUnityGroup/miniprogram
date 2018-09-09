import React, {Component} from 'react';
import { Upload, Modal, Icon, Input } from 'antd';
import request from '../../../utils/request';
import style from './Fire.css';
const { TextArea } = Input;

const mapChild = function(list) {
  let fileList = [];
  list.forEach((child, index) => {
    fileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return fileList;
};

class FireModule extends Component{

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: JSON.parse(localStorage.getItem('fileList')) || [],
  };

  UNSAFE_componentWillMount(){
    // console.log('插入前');
    let _this = this;
    request('https://www.changdaolife.cn/api/banner/getBanner?page=fire')
    .then(res => {
      console.info(res);
      let list = mapChild(res.data.requestData[0].bannerList);
      localStorage.setItem('fileList', JSON.stringify(list));
      _this.setState({
        fileList: list
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

  handleChange = ({ fileList }) => this.setState({ fileList })
  render(){
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className={style["element-content"]}>
        <h3 id="fire">火元素</h3>
        <h3 style={{marginTop: 20, marginLeft: 20}}>banner</h3>
        <div className={style["banner-content"]}>
          <Upload
            action="https://www.changdaolife.cn/api/banner/setBanner?page=fire"
            listType="picture-card"
            fileList={fileList}
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
        <h3 style={{marginTop: 20, marginLeft: 20}}>详情</h3>
        <div className={style["detail-content"]}>
          <TextArea rows={6} placeholder={'输入'}></TextArea>
        </div>
        <h3 style={{marginTop: 20, marginLeft: 20}}>春</h3>
        <div className={style["spring-content"]}>
          <TextArea rows={6} placeholder={'输入'}></TextArea>
        </div>
      </div>
    );
  }
}

export default FireModule;