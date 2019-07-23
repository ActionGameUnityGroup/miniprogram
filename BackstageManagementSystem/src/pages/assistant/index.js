import React, { Component } from 'react';
import { request, URL } from '@/utils';
import { Button, Modal } from 'antd';
import styles from './assistant.css';
import { connect } from 'dva';

import AssistantList from './components/AssistantList';
import AssistantIntroduceRichText from './components/AssistantIntroduceRichText';

class Assistant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: false,
      isModify: false,
      loading: false,
      assistantIntroduce: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.getAssistantList();
    this.getAssistantIntroduce();
  }

  getAssistantList = () => {
    const _this = this;
    _this.setState({ loading: true });
    request(URL.getAssistantList, {
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

  getAssistantIntroduce = () => {
    const _this = this;
    request(URL.getAssistantIntroduce, {
      method: 'GET'
    }).then(data => {
      if (data.data.code === 200) {
        let assistantIntroduce = data.data.data;
        _this.setState({ assistantIntroduce });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  addNewAssistant = () => {
    this.props.history.push('/setAssistant', null);
  }

  checkIntroduce = (e) => {
    const type = e.target.id;
    let visible = false;
    if (type === 'show') {
      visible = true;
    }
    this.setState({ visible, isModify: false });
  }

  changeModify = () => {
    this.setState({ isModify: !this.state.isModify });
  }

  setAssistantIntroduce = (introduce) => {
    request(URL.setAssistantIntroduce, {
      method: 'POST',
      body: JSON.stringify({ introduce }),
    }).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(`报错：${err}`);
    });
  }

  changeAssistantIntroduce = (assistantIntroduce) => {
    this.setAssistantIntroduce(assistantIntroduce);
    this.setState({ assistantIntroduce });
    this.changeModify();
  }

  render() {
    const { list, visible, assistantIntroduce, isModify, loading } = this.state;
    const footer = isModify ? null : (<Button onClick={this.changeModify}>修改介绍</Button>);
    return (
      <div>
        <div className={styles['header']}>
          <h2 className={styles['title']}>助教列表</h2>
          <div className={styles['actions-bar']}>
            <Button onClick={this.checkIntroduce} id='show'>查看助教介绍</Button>
            <Button type='primary' onClick={this.addNewAssistant}>新增助教</Button>
          </div>
        </div>
        <AssistantList list={list} loading={loading} />
        <Modal
          visible={visible}
          title='助教介绍'
          onCancel={this.checkIntroduce}
          id='hide'
          footer={footer}
          width={880}
          style={{ paddingBottom: 0 }}
          centered={isModify}
          maskClosable={false}
        >
          {
            isModify ?
            <AssistantIntroduceRichText html={assistantIntroduce} onChange={this.changeAssistantIntroduce} />
            :
            <div dangerouslySetInnerHTML={{ __html: assistantIntroduce }} style={{ maxHeight: 350, overflow: 'auto' }} />
          }
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(Assistant);
