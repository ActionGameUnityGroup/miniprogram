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
  let fileList = [];
  list.forEach((child, index) => {
    fileList.push({uid: index, name: child.name, status: 'done', url: child.url});
  });
  return fileList;
};

class IndexSection extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: JSON.parse(localStorage.getItem('fileList')) || [],
  };

  UNSAFE_componentWillMount(){
    // console.log('插入前');
    let _this = this;
    request('https://www.changdaolife.cn/api/banner/getBanner?page=index')
    .then(res => {
      let list = mapChild(res.data.requestData[0].bannerList);
      localStorage.setItem('fileList', JSON.stringify(list));
      // console.info(list);
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
      <div className={style["index-section"]}>
        <h1 style={{margin: 0, padding: '10px 0'}}>首页 Banner</h1>
        <div className={style["banner-content"]}>
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
      </div>
    );
  }
}

export default IndexSection;
