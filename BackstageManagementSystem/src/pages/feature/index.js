import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import FeatureList from './components/FeatureList';
import styles from './feature.css';
import { request, URL } from '@/utils';

class Feature extends Component {

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
    this.getCourseFeatureList({ number, size });
  }

  getCourseFeatureList({ number, size }) {
    let _this = this;
    _this.setState({ loading: true });
    request(`${URL.getCourseFeatureList}?number=${number}&size=${size}`, {
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

  addNewFeature = () => {
    this.props.history.push('/setFeature', null);
  }

  render() {
    const { list, loading } = this.state;

    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>课程风采列表</h2>
          <Button type='primary' onClick={this.addNewFeature}>新增课程风采</Button>
        </div>
        <FeatureList list={list} loading={loading} />
      </div>
    );
  }
}

export default connect()(Feature);