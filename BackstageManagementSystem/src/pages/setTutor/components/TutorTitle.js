import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import TutorTitleModal from './TutorTitleModal';

class TutorTitle extends Component {

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      visible: false,
    }
  }

  handleChangeTitle = (title) => {
    this.setState({ value: '' });
    this.triggerChange({ value: title });
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    console.log(changedValue);
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, changedValue));
    }
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleHideModal = () => {
    this.setState({ visible: false });
  }

  render() {
    let { visible } = this.state;
    let title = this.props.value.value;
    console.log(title);
    return (
      <span>
        <Row type='flex' justify='space-between' align='top'>
          {
            title.length ?
            <Col span={16}>
              <div>
                {
                  title.map((item, key) => (
                    <div span={14} key={key}>{key + 1}. {item}</div>
                  ))
                }
              </div>
            </Col>
            : null
          }
          <Col span={6}>
            <Button onClick={this.showModal}>新增头衔</Button>
          </Col>
        </Row>
        <TutorTitleModal
          onOk={this.handleHideModal}
          onCancel={this.handleHideModal}
          visible={visible}
          title={title}
          onChange={this.handleChangeTitle}
        />
      </span>
    );
  }
}

export default TutorTitle;