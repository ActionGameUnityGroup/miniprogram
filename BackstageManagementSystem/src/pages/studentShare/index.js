import React, { Component } from 'react';
import { request, URL } from '@/utils';
import { Button } from 'antd';
import styles from './assistant.css';
import { connect } from 'dva';

import StudentShareList from './components/StudentShareList';

class Assistant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
      loading: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.getShareList({ number: 1, size: 10 });
  }

  getShareList = ({ number, size }) => {
    const _this = this;
    _this.setState({ loading: true });
    request(`${URL.getShareList}?number=${number}&size=${size}`, {
      method: 'GET'
    }).then(data => {
      if (data.data.code === 200) {
        let list = [];
        for (let i = 0, length = data.data.data.length; i < length; i++) {
          let item = data.data.data[i];
          item.key = i;
          list.push(item);
        }
        _this.setState({ list, loading: false });
      }
    }).catch(err => {
      console.error(err);
    });
  }


  addNewAssistant = () => {
    this.props.history.push('/setStudentShare', null);
  }

  render() {
    const { list, loading } = this.state;
    console.log(list);
    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>学员分享列表</h2>
          <Button type='primary' onClick={this.addNewAssistant}>新增学员分享</Button>
        </div>
        <StudentShareList list={list} loading={loading} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(Assistant);
