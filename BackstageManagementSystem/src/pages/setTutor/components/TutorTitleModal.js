import React, { Component } from 'react';
import { Row, Col, Modal, Input, Button, Icon } from 'antd';

class TutorTitleModal extends Component {

  constructor(props) {
    super(props);

    const title = props.title || [];
    console.log(title);
    this.state = {
      value: '',
      title,
      removeList: {},
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.title.length !== nextState.title.length) {
      this.setState({
        title: nextProps.title
      });
    }
  }

  handleChangeTitle = (e) => {
    let { value } = e.target;
    this.setState({ value });
  }

  handleAddTitle = () => {
    let { value, title } = this.state;
    console.log(value);
    title.push(value);
    value = '';
    this.setState({
      title,
      value,
    });
    // this.props.onChange(title);
  }

  onOk = () => {
    const { title, removeList } = this.state;
    let newTitle = [];
    for (let i = 0, length = title.length; i < length; i++) {
      let flag = removeList[i];
      if (!flag) {
        newTitle.push(title[i]);
      }
    }
    const { onChange, onOk } = this.props;
    onChange(newTitle);
    onOk();
    this.setState({ title: newTitle, removeList: {} });
  }

  onCancel = () => {
    const { onCancel } = this.props;
    console.log('Cancel');
    onCancel();
  }

  handleRemoveTitle = (key) => {
    const { removeList } = this.state;
    removeList[key] = true;
    this.setState({ removeList });
  }

  render() {
    const { value } = this.state;
    return (
      <Modal
        visible={this.props.visible}
        title='新增头衔'
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Row type='flex' justify='space-between'>
          <Col span={20}><Input placeholder='请输入导师头衔' onChange={this.handleChangeTitle} value={value} /></Col>
          <Col span={3}><Button onClick={this.handleAddTitle}>添加</Button></Col>
        </Row>
        <div style={{ height: 20 }}></div>
        <Row type='flex' justify='space-between'>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>已添加头衔：</div>
          </Col>
          {
            this.state.title.length ?
            <Col span={16}>{
              this.state.title.map((item, key) => (
                !this.state.removeList[key] ?
                <div key={key}>
                  <Row type='flex' justify='space-between' align='top'>
                    <Col span={20}>
                      <span>{item}</span>
                    </Col>
                    <Col span={3}>
                      <Icon type="close" onClick={() => this.handleRemoveTitle(key)} />
                    </Col>
                  </Row>
                </div>
                : null
              ))
            }</Col>
            : null
          }
        </Row>
        <div>

        </div>
      </Modal>
    );
  }
}

export default TutorTitleModal;