import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import RichList from './components/RichList';
import styles from './rich.css';
import { request, URL } from '@/utils';

class Rich extends Component {

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
    this.getCourseList({ number, size });
  }

  getCourseList({ number, size }) {
    let _this = this;
    _this.setState({ loading: true });
    request(`${URL.getCourseList}?number=${number}&size=${size}`, {
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

  addNewRich = () => {
    this.props.history.push('/setRich', null);
  }

  render() {
    const { list, loading } = this.state;

    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>丰盛系列</h2>
          <Button type='primary' onClick={this.addNewRich}>新增课程</Button>
        </div>
        <RichList list={list} loading={loading} />
      </div>
    );
  }
}

export default connect()(Rich);