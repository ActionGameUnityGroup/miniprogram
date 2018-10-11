import React, {Component} from 'react';
import style from './IndexSection.css';
import { Upload, Icon, Modal } from 'antd';
import request from '../../utils/request';

/*{
  uid: '-1',
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}*/

const mapChild = (list) => {
  let indexFileList = [];
  list.forEach((child, index) => {
    indexFileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return indexFileList;
};

/*const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:image/png;base64,'+window.btoa(binary);
}*/

class IndexSection extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    indexFileList: JSON.parse(localStorage.getItem('indexFileList')) || [],
  };

  UNSAFE_componentWillMount(){
    // console.log('插入前');
    let _this = this;
    request('https://www.changdaolife.cn/api/banner/getBanner?page=index')
    .then(res => {
      console.log(res, '回调');
      /*const bannerList = [];
      for(let index = 0; index < res.data.requestData.length; index++){
        // console.log(res.data.requestData[index].url.data, 'item');
        bannerList[index] = {
          name: res.data.requestData[index].name,
          url: arrayBufferToBase64(res.data.requestData[index].url.data)
        }
      }*/
      let list = mapChild(res.data.requestData[0].bannerList);
      localStorage.setItem('indexFileList', JSON.stringify(list));
      // console.info(list);
      _this.setState({
        indexFileList: list
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

  handleChange = ({ indexFileList }) => this.setState({ indexFileList })

  render(){

    const { previewVisible, previewImage, indexFileList } = this.state;

    return (
      <div className={style["index-section"]}>
        <h1 style={{margin: 0, padding: '10px 0'}}>首页 Banner</h1>
        <div className={style["banner-content"]}>
          <Upload
            action="https://www.changdaolife.cn/api/banner/setBanner?page=index"
            listType="picture-card"
            fileList={indexFileList}
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

export default IndexSection;
