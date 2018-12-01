import React, {Component} from 'react';
import { Upload, Modal, Icon, Input, Select, Button, } from 'antd';
import request from '../../../utils/request';
import style from './Element.css';
const { TextArea } = Input;
const { Option } = Select;

const mapChild = function(list) {
  let fileList = [];
  list.forEach((child, index) => {
    fileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return fileList;
};

class Element extends Component{

  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: JSON.parse(localStorage.getItem('fileList')) || [],
      elementKey: "wood",
      elementDetail: "",
      elementFestival: "",
    };
  }


  UNSAFE_componentWillMount(){
    let page =  this.state.elementKey;
    this.getElementBanner(page);
  }

  getElementBanner(page){
    let _this = this;
    request(`https://www.changdaolife.cn/api/banner/getBanner?page${page}`)
    .then(res => {
      let list;
      if(res.data.requestData.length > 0){
        list = mapChild(res.data.requestData[0].bannerList);
        localStorage.setItem('fileList', JSON.stringify(list));
      } else {
        list = [];
      }
      _this.setState({
        fileList: list
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  selectElement(value){
    this.setState({
      elementKey: value,
    });
    this.getElementBanner(value);
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = ({ fileList }) => this.setState({ fileList })

  render(){
    const { previewVisible, previewImage, fileList, elementKey, elementDetail, elementFestival, } = this.state;
    return (
      <div className={style["element-content"]}>
        <h3>元素模块</h3>
        <div className={style["choose-element-content"]}>
          <span style={{marginRight: 15, fontSize: 15, color: "#333"}}>当前元素模块: </span>
          <Select
            value={elementKey}
            onSelect={(value) => this.selectElement(value)}
          >
            <Option value="wood">木元素</Option>
            <Option value="fire">火元素</Option>
            <Option value="earth">土元素</Option>
            <Option value="gold">金元素</Option>
            <Option value="water">水元素</Option>
          </Select>
        </div>
        <div className={style["banner-content"]}>
          <h3>banner</h3>
          <Upload
            action="https://www.changdaolife.cn/api/banner/setBanner?page=index"
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
        <div className={style["detail-content"]}>
          <h3>详情</h3>
          <TextArea
            rows={8}
            placeholder={'输入'}
            value={elementDetail}
          />
          <div className={style["detail-button-content"]}>
            <Button>确认更新</Button>
            <Button
              type="danger"
              style={{marginLeft: 20}}
            >重置</Button>
          </div>
        </div>
        <div className={style["festival-content"]}>
          <h3>春</h3>
          <TextArea
            rows={8}
            placeholder={'输入'}
            value={elementFestival}
          ></TextArea>
          <div className={style["detail-button-content"]}>
            <Button>确认更新</Button>
            <Button
              type="danger"
              style={{marginLeft: 20}}
            >重置</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Element;