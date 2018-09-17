import React, {Component} from 'react';
import { Upload, Modal, Icon, Input } from 'antd';
import request from '../../../utils/request';
import style from './Health.css';
const { TextArea } = Input;

const mapChild = function(list) {
  let healthFileList = [];
  list.forEach((child, index) => {
    healthFileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return healthFileList;
};

class Health extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    healthFileList: JSON.parse(localStorage.getItem('healthFileList')) || [],
  };

  UNSAFE_componentWillMount(){
    // console.log('插入前');
    let _this = this;
    request('https://www.changdaolife.cn/api/banner/getBanner?page=health')
    .then(res => {
      console.info(res);
      let list = mapChild(res.data.requestData[0].bannerList);
      localStorage.setItem('healthFileList', JSON.stringify(list));
      _this.setState({
        healthFileList: list
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

  handleChange = ({ healthFileList }) => this.setState({ healthFileList })
  render(){
    const { previewVisible, previewImage, healthFileList } = this.state;
    return (
      <div className={style["element-content"]}>
        <h3 style={{marginTop: 20, marginLeft: 20}}>banner</h3>
        <div className={style["banner-content"]}>
          <Upload
            action="https://www.changdaolife.cn/api/banner/setBanner?page=health"
            listType="picture-card"
            fileList={healthFileList}
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
        <h3 style={{marginTop: 20, marginLeft: 20}}>个案</h3>
        <div className={style["detail-content"]}>
          <TextArea rows={6} placeholder={'输入'}></TextArea>
        </div>
        <h3 style={{marginTop: 20, marginLeft: 20}}>工作坊</h3>
        <div className={style["spring-content"]}>
          <TextArea rows={6} placeholder={'输入'}></TextArea>
        </div>
        <h3 style={{marginTop: 20, marginLeft: 20}}>定制</h3>
        <div className={style["spring-content"]}>
          <TextArea rows={6} placeholder={'输入'}></TextArea>
        </div>
      </div>
    );
  }
}

export default Health;