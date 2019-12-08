import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import VideoList from './components/VideoList';
import styles from './Video.css';
import { request, URL } from '@/utils';

class Video extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      list: [],
      number: 1,
      size: 10,
    };
  }

  UNSAFE_componentWillMount() {
    const { number, size } = this.state;
    this.getVideoList({ number, size });
  }

  getVideoList({ number, size }) {
    let _this = this;
    _this.setState({ loading: true });
    request(`${URL.getVideoList}?number=${number}&size=${size}`, {
      method: 'GET'
    }).then(data => {
      if (data.data.code === 200) {
        let list = [];
        for (let i = 0, length = data.data.data.data.length; i < length; i++) {
          let item = data.data.data.data[i];
          item.key = i;
          list.push(item);
        }
        _this.setState({ list, loading: false });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  addNewVideo = () => {
    this.props.history.push('/setVideo', null);
  }

  render() {
    const { list, loading } = this.state;

    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>视频列表</h2>
          <Button type='primary' onClick={this.addNewVideo}>新增视频</Button>
        </div>
        <VideoList list={list} loading={loading} />
      </div>
    );
  }
}

export default connect()(Video);